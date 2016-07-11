var BindElement = function(element) {
  this.element = element;
  this.modelName = '';
  this.htmlKey = '';
  this.model = null;
  this.changeHandler = null;
  this.init();
};

BindElement.prototype = {
  modelName: null,
  htmlKey: null,
  model: null,
  changeHandler: null,
  element: null,
  init: function() {
    this.changeHandler = this.onChange.bind(this);
    this.modelName = this.element.getAttribute(BindJS.MODEL_ATTIBUTE);
    this.htmlKey = this.element.getAttribute(BindJS.HTML_ATTIBUTE);
    this.model = this.getModel(this.modelName);
    if (this.htmlKey) this.model.watch(this.htmlKey, this.changeHandler);
    var value = this.getValue(this.htmlKey, this.model);
    this.updateHTML(value);
  },
  onChange: function(id, oldval, newval) {
    if (oldval !== newval) this.updateHTML(newval);
    return newval;
  },
  updateHTML: function(value) {
    if (this.htmlKey) {
      this.element.textContent = value;
    }
  },
  getModel: function(string) {
    return window[string]
  },
  getValue: function(string, obj) {
    return string.split('.').reduce(this.modelIndex, obj);
  },
  modelIndex: function(obj, i) {
    return obj[i]
  }
};
