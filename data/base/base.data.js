const { ObjectID } = require('mongodb');

class BaseMongoDbData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    filterBy(props) {
        return this.collection.find(props).toArray();
    }

    getAll() {
        return this.collection.find()
            .toArray()
            .then((models) => {
                if (this.ModelClass.toViewModel) {
                    return models.map(
                        (model) => this.ModelClass.toViewModel(model)
                    );
                }
                return models;
            });
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Validation failed !!!');
        }
        return this.collection.insert(model)
           .then(() => {
               return model;
           });
    }

    findById(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    findByUsername(username) {
        return this
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }

    updateById(target, model) {
        if (typeof model === 'undefined' || typeof target === 'undefined') {
            return Promise.reject('Model or Target is undefined!');
        }

        return this.collection.updateOne({
            _id: target._id,
        }, model);
    }

    _isModelValid(model) {
        if ('undefined' === typeof this.validator ||
            'function' !== typeof this.validator.isValid) {
                return true;
            }
        return this.validator.isValid(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
 }

module.exports = BaseMongoDbData;
