const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// we will build our routes here

// GET /users/:userId/applications

router.get("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render("applications/index.ejs", {
            applications: currentUser.applications,
        });
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
});

// GET /new
router.get("/new", async (req, res) => {
    res.render("applications/new.ejs");
});


// POST /applications
router.post("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
});

// GET controllers/applications.js
router.get("/:applicationId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render("applications/show.ejs", {
            application: application
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});


// DELETE /users/:userId/applications/:applicationsId
router.delete("/:applicationId", async (req, res) => {
    try {
const currentUser = await User.findById(req.session.user._id);
currentUser.applications.id(req.params.applicationId).deleteOne();

await currentUser.save();

res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

//GET //controllers/applications.js
router.get("/:applicationId/edit", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render("applications/edit.ejs", {
            application: application,
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

module.exports = router;                                        