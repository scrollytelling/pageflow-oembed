//= require ./polyfills
//
pageflow.widgetTypes.register('pageflow_oembed', {
  enhance: function(element) {
    var urls = document.querySelectorAll('.contentText a');
    var embedLinks = Array.from(urls).filter(this.embeddable);
    for (var i = 0, len = embedLinks.length; i < len; i++) {
      if( /twitter/i.test(embedLinks[i].getAttribute('href')) )
        this.embedTwitter(embedLinks[i]);
    };
  },

  embeddable: function(link) {
    url = link.getAttribute('href');
    return /https?:\/\/twitter.com\/\w*\/\w*\/\d*/.test(url);
  },

  token: function() {
    return document.querySelector("meta[name='csrf-token']").content;
  },

  page: function(link) {
    return link.closest('.page');
  },

  embedSpotify: function(link) {
    var xhr = new XMLHttpRequest();
    var url = link.getAttribute('href');
    var data = {oembed: {url: url, locale: pageflow.seed.locale}};
    xhr.open("POST", '/oembed/fetch', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRF-Token", this.token());
    xhr.onload = function() {
      oembed = JSON.parse(this.responseText);
      link.outerHTML = oembed.html;
    };
    xhr.send(JSON.stringify(data));
  },

  embedTwitter: function(link) {
    var url = link.getAttribute('href');
    var match = /(\d+)$/.exec(url);
    tweetId = match[0];
    var theme = this.page(link).classList.contains('invert') ? 'light' : 'dark';

    link.insertAdjacentHTML('beforebegin', '<span id="tweet-'+tweetId+'"></span>')

    var options = {omit_script: true, related: 'scrollytelling', lang: pageflow.seed.locale, theme: theme, dnt: 'true'};
    twttr.widgets.createTweet(
      tweetId,
      document.getElementById('tweet-'+tweetId),
      options
    );
    link.style.display = 'none';
  }
});
