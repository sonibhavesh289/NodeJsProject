const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectMongoDb = require("./connection.js");
const UserModel = require('./models/user.js');
const URL = require("./models/url");
const static_route = require("./routes/static_routes.js")
const user_route = require("./routes/user.js");
const url_route = require("./routes/url.js");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const app = express();


connectMongoDb("mongodb://127.0.0.1:27017/short_url").then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// To enable EJS, server side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Parse the request and fill req.body
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// static route will render "login", "signup", "home" views.
app.use("/", checkAuth, static_route);

app.use("/user", user_route);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
});

app.use("/url", restrictToLoggedinUserOnly, url_route);

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});