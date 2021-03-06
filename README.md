# Pageflow::Oembed

This plugin will search for links in your Pageflow 0.11 stories, and turn them
into embedded content when possible. For example, instead of a link to a
[Tweet URL](https://twitter.com/scrollytelling/status/885128273239396352), people
reading your story will see the Tweet embedded in the page.

🌟 [Read the introduction on Scrollytelling](https://app.scrollytelling.io/embed-a-tweet) 🌟

It usually works using [oEmbed](http://oembed.com), the standard protocol for discovering
and showing embedded content. Although sometimes we use a JavaScript SDK, since it
gives better results. When we do use oEmbed, the embed-code is cached in
the database.

The best aspect about this plugin is for editors working with Pageflow. You
don't have to do anything out of the ordinary. Continue to add links as normal,
using the built-in html editor in Pageflow. Your hand-crafted, artisanal words
are not affected by our code. The plain link will be visible to you, dear editor, as always. It's just
that on the front end, the link is replaced by embedded content.

![Party Hard](https://media.giphy.com/media/Hd3GXtH7xs1CU/giphy.gif)

If you don't want the embed, remove the link. In a future release there might
be a mechanism to deal with this.

## Not for Pageflow 12

This plugin is fundamentally incompatible with Pageflow 12. :'(

Codevise and Scrollytelling are currently investigating the best way to bring it over!

### 🖤 Heads up: contains ~~evil spyware~~ social scripts 👀

To create the best versions of embedded content, we usually include the
JavaScript SDK a provider has created. For example, Twitter and Facebook. The
embeds sans JS aren't so nice to see, they don't live update the hearts and
thumbs and all that, and certainly won't open the respective apps on your phone.

If you hate the thought of being tracked on the interwebs, well, I hear what
you're saying but we wanna be pragmatic. Should I make using the SDKs configurable?
Why me? It's open source, you do it! Send me a patch!

### Whitelisted URLs

We work with a whitelist _(actually a regex, hurr durr)_ and will convert only some links.

Currently supported:

* twitter, single tweet: https://twitter.com/scrollytelling/status/885128273239396352
* spotify, single track: https://open.spotify.com/track/298gs9ATwr2rD9tGYJKlQR
* spotify, artist: https://open.spotify.com/artist/0IIPgITtEO4JJfipw57KGv
* facebook, post: https://www.facebook.com/20531316728/posts/10154009990506729/

Note that the URL you use must look exactly like the ones above. Not *exactly*, the numbers and things can be different. You know what I mean.

#### More providers will follow. Want your fave in here? [Create an issue!](https://github.com/scrollytelling/pageflow-oembed/issues/new)

### Just uses JavaScript

No jQuery was created during the development of this plugin. It does mean we
have two polyfills to get IE on board. These don't get loaded if your browser
is up to date. And if you are using a really ancient browser, well, that's
your choice.

## Scrollytelling. What's that now?

We are [Scrollytelling](https://www.scrollytelling.io/). We enable online
stories. We host stories for national media. We run a custom version
of the awesome [Pageflow](https://github.com/codevise/pageflow) storytelling
tool. We continously give back to the community and we hope that you'll
enjoy this plugin too.


## Installation

Add this line to your application's Gemfile:

```ruby
gem 'pageflow-oembed'
```

And then execute:

    $ bundle

## Configuration

Add it to the Pageflow initializer in the host application:

```ruby
# config/initializers/pageflow.rb
Pageflow.configure do |config|
  config.plugin(Pageflow::Oembed.plugin)
end
```

Copy the migrations:

```shell
rake pageflow_oembed:install:migrations
rake db:migrate SCOPE=pageflow_oembed
```

Add it to the asset pipeline:

```javascript
// app/assets/javascript/application.js
//= require pageflow/oembed
```

Finally, mount it in `routes.rb`:

```ruby
Rails.application.routes.draw do
  ...
  mount Pageflow::Oembed::Engine, at: '/oembed'
  ...
end
```

## Usage

In the Pageflow editor, insert a plain old link into the content text. Voila!

🌟 [Read the introduction on Scrollytelling](https://app.scrollytelling.io/embed-a-tweet) 🌟

## Uninstallation

Remove `pageflow-oembed` from Gemfile and run `bundle install`.

Generate a new migration to drop the table:

```shell
$ rails generate migration drop_pageflow_oembeds
```

Which contains:

```ruby
class DropPageflowOembeds < ActiveRecord::Migration
  def up
    drop_table :pageflow_oembed_oembeds
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
```

and then run `rake db:migrate` and commit everything.

Lastly, remove this widget from all entries. Quickest and most thourough:

``` ruby
Pageflow::Widget.where(role: "oembed", type_name: "pageflow_oembed").destroy_all
```

If you don't to this, editor functionality of stories with this widget will
be degraded.

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/scrollytelling/pageflow-oembed. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
