function objectEmptyCheck(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

function validateString(str) {
    if (!str || typeof str !== 'string') {
        throw new TypeError('Parameter is not a string')
    }
}

function validateFunction(fn) {
    if (!fn || typeof fn !== 'function') {
        throw new TypeError('Parameter is not a function')
    }
}

function validateParameters(type, cb) {
    validateString(type)
    validateFunction(cb)
}

function EventBus() {
    this._listeners = Object.create(null)
}

EventBus.prototype = {
    constructor: EventBus,
    on(type, cb) {
        validateParameters(type, cb)
        if (this._listeners[type]) {
            this._listeners[type].push(cb)
        } else {
            this._listeners[type] = [cb]
        }
    },
    once(type, cb) {
        validateParameters(type, cb)
        const handler = function (...args) {
            cb.call(this, ...args)
            this.off(type, handler)
        }
        handler.link = cb
        this.on(type, handler)
    },
    off(type, cb) {
        validateParameters(type, cb)
        if (this._listeners[type] && this._listeners[type].length) {
            this._listeners[type] = this._listeners[type].filter(handler => {
                return handler !== cb && handler.link !== cb
            })
        }
    },
    offAll(type) {
        if (!type) {
            this._listeners = Object.create(null)
            return this
        }
        this._listeners[type] && delete this._listeners[type]
        if (objectEmptyCheck(this._listeners)) {
            this._listeners = Object.create(null)
        }
        return this
    },
    emit(type, ...args) {
        validateString(type)
        if (this._listeners[type] && this._listeners[type].length) {
            this._listeners[type].forEach(handler => {
                handler.call(this, ...args)
            })
        }
    }
}

export default EventBus
