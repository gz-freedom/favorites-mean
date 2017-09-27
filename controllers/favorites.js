const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const config = require("../config/database");
const service = require("../models/service");

mongoClient.connect(config.databaseUrl, (err, db) => {

    router.get("/", (req, res) => {
        service.getFavorites(db, (err, result) => {
            res.write(JSON.stringify(result, null, 2));
            res.end();
        });
    });
    
    router.get("/favorites", (req, res) => {
        service.getFavorites(db, (err, result) => {
            if(err) {
                res.json({success: false, message: `Failed to load favorites. Error: ${err}`}); 
            }
            res.write(JSON.stringify({ success: true, data: result }, null, 2));
            res.end();
        });
    });
    
    router.get("/collections", (req, res) => {
        service.getCollections(db, (err, result) => {
            if(err) {
                res.json({success: false, message: `Failed to load collections. Error: ${err}`}); 
            }
            res.write(JSON.stringify({ success: true, data: result }, null, 2));
            res.end();
        });
    });
    
    router.get("/tags", (req, res) => {
        service.getTags(db, (err, result) => {
            if(err) {
                res.json({success: false, message: `Failed to load tags. Error: ${err}`}); 
            }
            res.write(JSON.stringify({ success: true, data: result }, null, 2));
            res.end();
        });
    });
    
    router.get("/collections/:id", (req, res) => {
        let collectionId = +req.params.id;
        service.getFavoritesByCollectionId(collectionId, db, (err, result) => {
            if(err) {
                res.json({success: false, message: `Failed to load tags. Error: ${err}`}); 
            }
            res.write(JSON.stringify({ success: true, data: result }, null, 2));
            res.end();
        });
    });
    
    router.get("/tags/:id", (req, res) => {
        let tagId = +req.params.id;
        service.getFavoritesByTagId(tagId, db, (err, result) => {
            if(err) {
                res.json({success: false, message: `Failed to load tags. Error: ${err}`}); 
            }
            res.write(JSON.stringify({ success: true, data: result }, null, 2));
            res.end();
        });
    });
    
    router.post("/", (req, res) => {
        res.send("POST");
    });
    
    router.delete("/:id", (req, res, next) => {
        res.send("DELETE");
    });
    
});

module.exports = router;