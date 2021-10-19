export const objectEmptyCheck = obj => obj && Object.keys(obj).length === 0 && obj.constructor === Object

export const validateString = (str) => {
    if (!str || typeof str !== 'string') {
        throw new TypeError('Parameter is not a string')
    }
}

export const validateFunction = fn => {
    if (!fn || typeof fn !== 'function') {
        throw new TypeError('Parameter is not a function')
    }
}

export const validateParameters = (type, cb) => {
    validateString(type)
    validateFunction(cb)
}