"use strict";var objectEmptyCheck=function(t){return t&&0===Object.keys(t).length&&t.constructor===Object},validateString=function(t){if(!t||"string"!=typeof t)throw new TypeError("Parameter is not a string")},validateFunction=function(t){if(!t||"function"!=typeof t)throw new TypeError("Parameter is not a function")},validateParameters=function(t,e){validateString(t),validateFunction(e)};function EventBus(){this._listeners=Object.create(null)}EventBus.prototype={constructor:EventBus,on:function(t,e){validateParameters(t,e),this._listeners[t]?this._listeners[t].push(e):this._listeners[t]=[e]},once:function(i,s){validateParameters(i,s);function r(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];s.call.apply(s,[this].concat(e)),this.off(i,r)}r.link=s,this.on(i,r)},off:function(t,e){validateParameters(t,e),this._listeners[t]&&this._listeners[t].length&&(this._listeners[t]=this._listeners[t].filter(function(t){return t!==e&&t.link!==e}))},offAll:function(t){return t?(this._listeners[t]&&delete this._listeners[t],objectEmptyCheck(this._listeners)&&(this._listeners=Object.create(null))):this._listeners=Object.create(null),this},emit:function(t){for(var e=this,n=arguments.length,i=new Array(1<n?n-1:0),s=1;s<n;s++)i[s-1]=arguments[s];validateString(t),this._listeners[t]&&this._listeners[t].length&&this._listeners[t].forEach(function(t){t.call.apply(t,[e].concat(i))})}},module.exports=EventBus;
