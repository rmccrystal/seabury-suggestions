import express from 'express';

var router = express.Router();

router.get("/test/", ((req, res) => {
    res.send("hello world")
}));

export default router;