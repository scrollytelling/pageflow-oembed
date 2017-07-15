// IE Polyfill for array.find()
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

pageflow.widgetTypes.register('pageflow_oembed', {
  enhance: function(element) {
    var urls = document.querySelectorAll('.contentText a');
    var embedLinks = Array.from(urls).filter(this.embeddable);
    for (var i = 0, len = embedLinks.length; i < len; i++) {
      this.embed(embedLinks[i]);
    }
  },

  embeddable: function(url) {
    return /https?:\/\/twitter.com\/\w*\/\w*\/\d*/.test(url)
  },

  embed: function(link) {
    var xhr = new XMLHttpRequest();
    var token = document.querySelector("meta[name='csrf-token']").content;
    var data = {oembed: {url: link.getAttribute('href')}};
    xhr.open("POST", '/oembed/fetch', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRF-Token", token);
    xhr.onload = function() {
      console.log(this.responseText);
    };
    xhr.send(JSON.stringify(data));
  }
});
