const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const config = require("../config/database");
const service = require("../models/service");

mongoClient.connect(config.databaseUrl, (err, db) => {
    let resultHandler = (res, result, err) => {
        if(err) {
            res.json({success: false, message: `Error: ${err}`}); 
        }
        res.write(JSON.stringify({ success: true, data: result }, null, 2));
        res.end();
    }

    router.get("/", (req, res) => {
        service.getFavorites(db, (err, result) => {
            res.write(JSON.stringify(result, null, 2));
            res.end();
        });
    });
    
    router.get("/favorites", (req, res) => {
        service.getFavorites(db, (err, result) => {
            resultHandler(res, result, err);
        });
    });
    
    router.get("/collections", (req, res) => {
        service.getCollections(db, (err, result) => {
            resultHandler(res, result, err);
        });
    });
    
    router.get("/tags", (req, res) => {
        service.getTags(db, (err, result) => {
            resultHandler(res, result, err);
        });
    });
    
    router.get("/collections/:id", (req, res) => {
        let collectionId = +req.params.id;
        service.getFavoritesByCollectionId(collectionId, db, (err, result) => {
            resultHandler(res, result, err);
        });
    });
    
    router.get("/tags/:id", (req, res) => {
        let tagId = +req.params.id;
        service.getFavoritesByTagId(tagId, db, (err, result) => {
            resultHandler(res, result, err);
        });
    });
    
    router.post("/add-collection/", (req, res) => {
        service.addCollection(req.body, db, (err, result) => {
            resultHandler(res, result["ops"][0], err);
        })
    });
    router.post("/add-favorite", (req, res) => {
        service.addFavorite(req.body, db, (err, result) => {
            resultHandler(res, result["ops"][0], err);
        })
    });
    router.post("/add-tag/", (req, res) => {
        service.addTag(req.body, db, (err, result) => {
            resultHandler(res, result["ops"][0], err);
        });
    });

    router.put("/update-collection", (req, res) => {
        service.updateCollection(req.body, db, (err, result) => {
            resultHandler(res, result["ops"][0], err);
        });
    })
    router.put("/update-tag", (req, res) => {
        service.updateTag(req.body, db, (err, result) => {
            resultHandler(res, result, err);
        });
    })
    
    router.delete("/:id", (req, res, next) => {
        res.send("DELETE");
    });
    
});

module.exports = router;