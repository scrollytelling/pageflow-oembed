# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'pageflow/oembed/version'

Gem::Specification.new do |spec|
  spec.name          = "pageflow-oembed"
  spec.version       = Pageflow::Oembed::VERSION
  spec.authors       = ["Joost Baaij"]
  spec.email         = ["joost@spacebabies.nl"]

  spec.summary       = "Turn links to embeddable content into the actual embedded content itself."
  spec.description   = "This plugin enhances Pageflow stories with OEmbed functionality. When a link is present in the body text, and its URL is whitelisted, the link is changed into the embedded content. The embedded content is stored on the local server. When available and/or better somehow, we also use a provider's JavaScript SDK."
  spec.homepage      = "https://github.com/scrollytelling/pageflow-oembed"
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = "https://rubygems.org"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_runtime_dependency "pageflow", "< 12.0.0"
  spec.add_runtime_dependency 'rails', '>= 3.0'
  spec.add_runtime_dependency "faraday"
  spec.add_runtime_dependency "faraday_middleware"

  spec.add_development_dependency "bundler", "~> 1.14"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
end
