const express = require("express");
const router = express.Router();
const service = require("../models/service");
let database = null;

service.connect((db) => {
    database = db;
});

router.get("/", (req, res) => {
    service.getFavorites(database, (err, result) => {
        // console.dir(result);
        res.write(JSON.stringify({ success: true, lists:result }, null, 2));
        res.end();
    });
});

router.get("/favorites", (req, res) => {
    service.getFavorites(database, (err, result) => {
        // console.dir(result);
        res.write(JSON.stringify({ success: true, lists:result }, null, 2));
        res.end();
    });
});

router.get("/collections", (req, res) => {
    service.getCollections(database, (err, result) => {});
});

router.get("/tags", (req, res) => {
    service.getTags(database, (err, result) => {});
});

router.get("/collections/:id", () => {});

router.get("/tags/:id", () => {});

router.post("/", (req, res) => {
    res.send("POST");
});

router.delete("/:id", (req, res, next) => {
    res.send("DELETE");
});

module.exports = router;