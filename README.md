# Pageflow::Oembed

This plugin will search for links in your Pageflow stories, and turn them
into embedded content when possible. For example, instead of a link to a
[Tweet URL](https://twitter.com/scrollytelling/status/885128273239396352), people
reading your story will see the Tweet embedded in the page.

It usually works using [oEmbed](http://oembed.com), the standard protocol for discovering
and showing embedded content. Although sometimes we use a JavaScript SDK, since it
gives better results. When we do use oEmbed, the embed-code is cached in
the database. And when we say JavaScript, we mean it! jQuery is not used at all.
This plugin contains two polyfills to get IE on board. And if you are using an
ancient browser, well, that's your choice.

The best aspect about this plugin is for editors working with Pageflow. You
don't have to do anything out of the ordinary. Continue to add links as normal,
using the built-in html editor in Pageflow. Your hand-creafted, artisanal words
are not affected by our code. The link will be visible to you as always. It's just
that on the front end, the link is replaced by the embedded content.

If you don't want the embed, remove the link. In a future release there might
be a mechanism to deal with this.

We work with a whitelist and will convert only some links.

Currently supported:

* twitter: https://twitter.com/scrollytelling/status/885128273239396352

Note that the URL you use must look exactly like the ones above.

More providers will follow.

## Scrollytelling. What's that now?

We are [Scrollytelling](https://www.scrollytelling.io/). We enable online
stories. we host multimedia content for national media. We run a custom version
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
# config/initializer/pageflow.rb
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

## Usage

TODO: Write usage instructions here

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/pageflow-oembed. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
