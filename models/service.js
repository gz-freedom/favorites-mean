const mongoClient = require("mongodb").MongoClient;
const config = require("../config/database");

module.exports.connect = (callback) => {
    mongoClient.connect(config.databaseUrl, (err, db) => {
        callback(db);
    });
};

module.exports.getFavorites = (db, callback) => {
    db.collection("favorites").find().toArray(callback);
}

module.exports.getCollections = (db, callback) => {
    db.collection("collections").find().toArray(callback);
}

module.exports.getTags = (db, callback) => {
    db.collection("tags").find().toArray(callback);
}

module.exports.getCollectionById = (collectionId, db, callback) => {
    db.collection("collections").find({ cId: collectionId }).toArray(callback);
}