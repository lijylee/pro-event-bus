(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.proEventBus = factory());
})(this, (function () { 'use strict';

    function objectEmptyCheck(obj) {
      return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    function EventBus() {
      this._listeners = Object.create(null);
    }

    EventBus.prototype = {
      constructor: EventBus,
      on: function on(type, cb) {
        if (this._listeners[type]) {
          this._listeners[type].push(cb);
        } else {
          this._listeners[type] = [cb];
        }
      },
      once: function once(type, cb) {
        var handler = function handler() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          cb.call.apply(cb, [this].concat(args));
          this.off(type, handler);
        };

        handler.link = cb;
        this.on(type, handler);
      },
      off: function off(type, cb) {
        if (this._listeners[type] && this._listeners[type].length) {
          this._listeners[type] = this._listeners[type].filter(function (handler) {
            return handler !== cb && handler.link !== cb;
          });
        }
      },
      offAll: function offAll(type) {
        if (!type) {
          this._listeners = Object.create(null);
          return this;
        }

        this._listeners[type] && delete this._listeners[type];

        if (objectEmptyCheck(this._listeners)) {
          this._listeners = Object.create(null);
        }

        return this;
      },
      emit: function emit(type) {
        var _this = this;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        if (this._listeners[type] && this._listeners[type].length) {
          this._listeners[type].forEach(function (handler) {
            handler.call.apply(handler, [_this].concat(args));
          });
        }
      }
    };

    return EventBus;

}));
