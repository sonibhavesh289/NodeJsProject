const express = require("express");
const userRouter = require("./routes/user");
const logRequest = require("./middlwares")
const connectMongoDb = require("./connection");

const app = express();

app.use(express.urlencoded({ extended: false })); // This middlware set req.body

app.use(logRequest("log.txt"));

app.use("/api/users", userRouter);

// Handle unknown routes (404)
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// Start the server
const PORT = 8000;
connectMongoDb("mongodb://127.0.0.1:27017/myproject").then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

