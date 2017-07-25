//= require ./polyfills
//
pageflow.widgetTypes.register('pageflow_oembed', {
  enhance: function(element) {
    var embedLinks = [];
    var urls = document.querySelectorAll('.contentText a');
    for(var i = urls.length; i--; embedLinks.unshift(urls[i]));

    for (var i = 0, len = embedLinks.length; i < len; i++) {
      var url = embedLinks[i].getAttribute('href');
      if( /twitter\.com\/\w*\/status\/\d*/i.test(url) )
        this.embedTwitter(embedLinks[i], url);
      else if( /open\.spotify\.com\/artist\/\w*/i.test(url) )
        this.embedSpotify(embedLinks[i], url);
      else if( /open\.spotify\.com\/track\/\w*/i.test(url) )
        this.embedSpotify(embedLinks[i], url);
    };
  },

  token: function() {
    return document.querySelector("meta[name='csrf-token']").content;
  },

  page: function(link) {
    return link.closest('.page');
  },

  embedSpotify: function(anchor, url) {
    var xhr = new XMLHttpRequest();
    var data = {oembed: {url: url}};
    xhr.open("POST", '/oembed/fetch', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRF-Token", this.token());
    xhr.onload = function() {
      oembed = JSON.parse(this.responseText);
      anchor.insertAdjacentHTML('afterend', oembed.html);
      anchor.style.display = 'none';
    };
    xhr.send(JSON.stringify(data));
  },

  embedTwitter: function(anchor, url) {
    var match = /(\d+)$/.exec(url);
    tweetId = match[0];
    var theme = this.page(anchor).classList.contains('invert') ? 'light' : 'dark';

    anchor.insertAdjacentHTML('beforebegin', '<span id="tweet-'+tweetId+'"></span>')

    var options = {omit_script: true, related: 'scrollytelling', lang: pageflow.seed.locale, theme: theme, dnt: 'true'};
    twttr.widgets.createTweet(
      tweetId,
      document.getElementById('tweet-'+tweetId),
      options
    );
    anchor.style.display = 'none';
  }
});
