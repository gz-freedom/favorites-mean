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
    getFavorites: (db, callback) => {
        db.collection("favorites").find({}, { _id: 0 }).toArray(callback);
    },
    getCollections: (db, callback) => {
        db.collection("collections").find({}, { _id: 0 }).toArray(callback);
    },
    getTags: (db, callback) => {
        db.collection("tags").find({}, { _id: 0 }).toArray(callback);
    },
    getTagById: (tagId, db, callback) => {
        db.collection("tags").find({ tagId: tagId }).next(callback);
    },
    getTagsByFavId: (favId, db, callback) => {
        db.collection("tags").find({ articleIds: { $all: [favId] } }).toArray(callback);
    },
    getCollectionById: (collectionId, db, callback) => {
        db.collection("collections").find({ cId: collectionId }).next(callback);
    },
    getCollectionByFavId: (favId, db, callback) => {
        db.collection("collections").find({ articleIds: { $all: [favId] } }).next(callback);
    },
    getFavoritesByIds: (idsArray, db, callback) => {
        db.collection("favorites").find({ articleId: { $in: idsArray } }).toArray(callback);
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
        db.collection("collections").updateOne({ cId: collection.cId }, { $set: { articleIds: collection.articleIds } });
    },
    updateTag: (tag, db, callback) => {
        db.collection("tags").updateOne({ tagId: tag.tagId }, { $set: tag });
    },

    /* Delete */
    deleteFavorite: (favoriteId, db, callback) => {
        db.collection("favorites").deleteOne({ articleId: favoriteId });
    },
    deleteTag: (tagId, db, callback) => {
        db.collection("tags").deleteOne({ tagId: tagId });
    }
}