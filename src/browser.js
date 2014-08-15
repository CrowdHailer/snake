window.Stream = require('./stream');

function peruse (obj) {
    return function(key) {
        return obj[key];
    }
}

window._ = {
    each: require('./each'),
    map: require('./map'),
    filter: require('./filter'),
    reduce: require('./reduce'),
    cleave: require('./cleave'),
    log: console.log.bind(console),
    dot: require('cumin-dot'),
    peruse: peruse,
    I: function(){ return arguments; }
}

window.$ = document.querySelector.bind(document);