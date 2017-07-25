const { ObjectID } = require('mongodb');

class BaseMongoDbData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    queryBuilder(props) {
        const query = {};
        if (props.num.length > 0) {
            query.num = props.num;
        }
        if (props.name.length > 0) {
            query.name = props.name;
        }
        if (props.town.length > 0) {
            query.town = props.town;
        }
        if (props.category.length > 0) {
            query.category = props.category;
        }
        return query;
    }

    findFirst(props) {
        return this.collection.findOne({ num: props });
    }

    filterBy(props) {
        // const query = this.queryBuilder(props);
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

    findOrCreateBy(props) {
        return this.filterBy(props)
            .then(([model]) => {
                if (!model) {
                    model = {};
                    return this.collection.insert(model)
                        .then(() => {
                            return model;
                        });
                }
                return model;
            });
    }

    updateById(target, model) {
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
