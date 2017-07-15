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

// IE polyfill for Element.closest()
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

pageflow.widgetTypes.register('pageflow_oembed', {
  enhance: function(element) {
    var urls = document.querySelectorAll('.contentText a');
    var embedLinks = Array.from(urls).filter(this.embeddable);
    for (var i = 0, len = embedLinks.length; i < len; i++) {
      this.embed(embedLinks[i]);
    };
  },

  embeddable: function(link) {
    url = link.getAttribute('href');
    return /https?:\/\/twitter.com\/\w*\/\w*\/\d*/.test(url);
  },

  embed: function(link) {
    var xhr = new XMLHttpRequest();
    var token = document.querySelector("meta[name='csrf-token']").content;
    var page = link.closest('.page');
    var theme = page.classList.contains('invert') ? 'light' : 'dark';
    var url = link.getAttribute('href');
    var data = {oembed: {url: url, theme: theme, locale: pageflow.seed.locale}};
    xhr.open("POST", '/oembed/fetch', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRF-Token", token);
    xhr.onload = function() {
      oembed = JSON.parse(this.responseText);
      // link.outerHTML = oembed.html;
      twttr.widgets.createTweet(
        url.slice(-18),
        link
      )
    };
    xhr.send(JSON.stringify(data));
  }
});
