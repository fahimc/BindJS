var BindJS = {
  MODEL_ATTIBUTE: 'model',
  HTML_ATTIBUTE: 'html',
  init: function() {
    document.addEventListener('DOMContentLoaded', this.onLoaded.bind(this));
  },
  onLoaded: function() {
    
    this.setup();
  },
  setup: function() {
    var elementCollection = document.querySelectorAll('[' + this.MODEL_ATTIBUTE + ']');
    for (var a = 0; a < elementCollection.length; a++) {
      var element = elementCollection[a];
      var bindElement = new BindElement(element);
      console.log(bindElement);
    }
  }

}
BindJS.init();

