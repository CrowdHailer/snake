Object.prototype.forEach = function (action) {
    var obj = this;
    console.log(obj)
    for (key in obj) {
        console.log(key)
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
    collection.forEach(action)
};