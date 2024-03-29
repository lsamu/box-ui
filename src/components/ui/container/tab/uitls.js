export function isFunction (fn) {
    if (!fn) {
        return false
    }
    return typeof fn === 'function'
}

export function isString (str) {
    if (!str) {
        return false
    }
    return typeof str === 'string'
}

export function isObject (obj) {
    if (!obj) {
        return false
    }
    return Object.prototype.toString.call(obj) === '[object Object]'
}
