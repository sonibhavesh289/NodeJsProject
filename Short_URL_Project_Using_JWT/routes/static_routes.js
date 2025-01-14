const express = require("express");
const URL = require("../models/url");
const {restictTo} =  require("../middlewares/auth");

const router = express.Router();

router.get("/", restictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allurls,
        pageView : "NORMAL"
    });
});

router.get("/admin/urls", restictTo(["ADMIN"]), async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home", {
        urls: allurls,
        pageView: "ADMIN" // You can give directly "ADMIN"
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});
router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;