if (!Object.prototype.watch) {
  Object.prototype.watchHandlers = [];
  Object.prototype.updateHandlers = function(prop, oldval, val) {
    for (var a = 0; a < this.watchHandlers.length; a++) {
      var item = this.watchHandlers[a];
      if(item.prop == prop)this.watchHandlers[a].handler(prop, oldval, val);
    }
  }
  Object.prototype.removeHandler = function(handler) {
    for (var a = 0; a < this.watchHandlers.length; a++) {
      if(handler == this.watchHandlers[a].handler) 
      {
        this.watchHandlers.splice(a,1);
        return;
      }
    }

  }
  Object.prototype.getPropertyValue = function(string) {
    return string.split('.').reduce(this.propertyIndex, this);
  },
  Object.prototype.propertyIndex =  function(obj, i) {
    console.log(obj,i);
    return obj[i];
  }
  Object.defineProperty(Object.prototype, "watch", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: function(prop, handler) {
      var
        oldval = this[prop],
        newval = oldval,
        getter = function() {
          return newval;
        },
        setter = function(val) {
          oldval = newval;
          console.log(val,oldval);
          return this.updateHandlers(prop, oldval, val);
        };

        this.watchHandlers.push({prop:prop,handler:handler});

      if (delete this[prop]) { // can't watch constants
        Object.defineProperty(this, prop, {
          get: getter,
          set: setter,
          enumerable: true,
          configurable: true
        });
      }
    }
  });
}

// object.unwatch
if (!Object.prototype.unwatch) {
  Object.defineProperty(Object.prototype, "unwatch", {
    enumerable: false,
    configurable: true,
    writable: false,
    value: function(prop, handler) {
      var val = this[prop];
      delete this[prop]; // remove accessors
      this[prop] = val;
    }
  });
}
