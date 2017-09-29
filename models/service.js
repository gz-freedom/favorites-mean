const _getFavoritesByIds = (idsArray, db, callback) => {
    db.collection("favorites").find({ articleId: { $in: idsArray } }).toArray(callback);
}
const _getCollectionById = (collectionId, db, callback) => {
    db.collection("collections").find({ cId: collectionId }).next(callback);
}
const _getTagById = (tagId, db, callback) => {
    db.collection("tags").find({ tagId: tagId }).next(callback);
}

module.exports = {
    getCollectionById: _getCollectionById,
    getTagById: _getTagById,

    getFavorites: (db, callback) => {
        db.collection("favorites").find({}, { _id: 0 }).toArray(callback);
    },
    getCollections: (db, callback) => {
        db.collection("collections").find({}, { _id: 0 }).toArray(callback);
    },
    getTags: (db, callback) => {
        db.collection("tags").find({}, { _id: 0 }).toArray(callback);
    },
    
    getFavoritesByCollectionId: (collectionId, db, callback) => {
        _getCollectionById(collectionId, db, (err, collection) => {
            let articleIds = collection.articleIds;
            _getFavoritesByIds(articleIds, db, callback);
        });
    },
    getFavoritesByTagId: (tagId, db, callback) => {
        _getTagById(tagId, db, (err, tag) => {
            let articleIds = tag.articleIds;
            _getFavoritesByIds(articleIds, db, callback);
        })
    },

    /* Add */
    addCollection: (collection, db, callback) => {
        db.collection("collections").insertOne(collection, callback);
    },
    addFavorite: (favorite, db, callback) => {
        db.collection("favorites").insertOne(favorite, callback);
    },
    addTag: (tag, db, callback) => {
        db.collection("tags").insertOne(tag, callback);
    },

    /* Update */
    updateCollection: (collection, db, callback) => {
        db.collection("collections").updateOne({ cId: collection.cId }, { $set: collection });
    },
    updateTag: (tag, db, callback) => {
        db.collection("tags").updateOne({ tagId: tag.tagId }, { $set: tag });
    }
}