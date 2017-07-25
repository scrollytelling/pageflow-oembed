//= require ./polyfills
//
pageflow.widgetTypes.register('pageflow_oembed', {
  enhance: function(element) {
    var links = document.querySelectorAll('.contentText a');

    for (var i = 0; i < links.length; ++i) {
      var link = links[i];
      var url = link.getAttribute('href');

      if( this.regex.twitter.test(url) )
        this.embedTwitter(link, url);
      else if( this.regex.spotify.test(url) )
        this.embedSpotify(link, url);
      else if( this.regex.facebookPost.test(url) )
        this.embedFacebookPost(link, url);
    }
  },

  regex: {
    twitter: /twitter\.com\/\w*\/status\/\d*/i,
    spotify: /open\.spotify\.com\/\w*\/\w*/i,
    facebookPost: /facebook\.com\/\d*\/posts\/\d*/i
  },

  token: function() {
    return document.querySelector("meta[name='csrf-token']").content;
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
    var page = anchor.closest('.page');
    var theme = page.classList.contains('invert') ? 'light' : 'dark';

    anchor.insertAdjacentHTML('beforebegin', '<span id="tweet-'+tweetId+'"></span>');

    var options = {omit_script: true, related: 'scrollytelling', lang: pageflow.seed.locale, theme: theme, dnt: 'true'};
    twttr.widgets.createTweet(
      tweetId,
      document.getElementById('tweet-'+tweetId),
      options
    );
    anchor.style.display = 'none';
  },

  embedFacebookPost: function(anchor, url) {
    anchor.insertAdjacentHTML('beforebegin', '<div class="fb-post" data-href="'+url+'"></div>');
    FB.XFBML.parse(anchor.parentNode);
    anchor.style.display = 'none';
  }
});
