const express = require("express");
const router = express.Router();
const service = require("../models/service");
let database = null;

service.connect((db) => {
    database = db;
});

router.get("/", (req, res) => {
    service.getFavorites(database, (err, result) => {
        res.write(JSON.stringify(result, null, 2));
        res.end();
    });
});

router.get("/favorites", (req, res) => {
    service.getFavorites(database, (err, result) => {
        if(err) {
            res.json({success: false, message: `Failed to load favorites. Error: ${err}`}); 
        }
        res.write(JSON.stringify({ success: true, data: result }, null, 2));
        res.end();
    });
});

router.get("/collections", (req, res) => {
    service.getCollections(database, (err, result) => {
        if(err) {
            res.json({success: false, message: `Failed to load collections. Error: ${err}`}); 
        }
        res.write(JSON.stringify({ success: true, data: result }, null, 2));
        res.end();
    });
});

router.get("/tags", (req, res) => {
    service.getTags(database, (err, result) => {
        if(err) {
            res.json({success: false, message: `Failed to load tags. Error: ${err}`}); 
        }
        res.write(JSON.stringify({ success: true, data: result }, null, 2));
        res.end();
    });
});

router.get("/collections/:id", (req, res) => {
    let collectionId = +req.params.id;
    service.getCollectionById(collectionId, database, (err, result) => {
        if(err) {
            res.json({success: false, message: `Failed to load tags. Error: ${err}`}); 
        }
        res.write(JSON.stringify({ success: true, data: result }, null, 2));
        res.end();
    });
});

router.get("/tags/:id", () => {});

router.post("/", (req, res) => {
    res.send("POST");
});

router.delete("/:id", (req, res, next) => {
    res.send("DELETE");
});

module.exports = router;