Object.prototype.forEach = function (action) {
    var obj = this;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj.length) {
                key = parseInt(key)
            }
            item = obj[key];
            action.call(this, item, key, obj)
        }
    }
}

module.exports = function (action, collection) {
    if (arguments.length === 2) {
        collection.forEach(action)
    } else {
        return function (collection) {
            collection.forEach(action)
        }
    }
};