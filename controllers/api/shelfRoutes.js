const router = require('express').Router();

router.get("/", async(req, res) => {
    res.json("shelf routes here");
});

module.exports = router;