window.Stream = require('./stream');

window._ = {
    each: require('./each'),
    map: require('./map'),
    filter: require('./filter'),
    log: console.log.bind(console),
    dot: require('cumin-dot')
}

window.$ = document.querySelector.bind(document);