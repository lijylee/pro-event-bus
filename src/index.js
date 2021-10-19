import { objectEmptyCheck, validateParameters, validateString } from './util';

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
