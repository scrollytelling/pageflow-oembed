module Pageflow
  module Oembed
    class Fetcher
      def initialize(url, params={})
        @url = url
        @params = params
      end

      attr_reader :url, :params

      def self.fetch(url, params)
        new(url, params).fetch
      end

      def fetch
        if url.include?('twitter')
          provider = Providers::Twitter.new(url, params)
          provider.oembed_response
        elsif url.include?('spotify')
          provider = Providers::Spotify.new(url, params)
          provider.oembed_response
        end
      end
    end
  end
end
