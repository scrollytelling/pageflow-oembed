# Pageflow::Oembed


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
  config.plugin(Pageflow::Oembed::Plugin.new)
end
```

Copy the migrations:

```shell
rake pageflow_oembed:install:migrations
rake db:migrate SCOPE=pageflow_oembed
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
