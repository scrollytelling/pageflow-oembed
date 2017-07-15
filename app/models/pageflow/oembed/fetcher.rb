require 'faraday'
require 'faraday_middleware'

module Pageflow
  module Oembed
    class Fetcher
      def initialize(url)
        @url = url
      end

      attr_reader :url

      def self.fetch(url)
        new(url).fetch
      end

      def fetch
        # Twitter: GET https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2FInterior%2Fstatus%2F507185938620219395
        connection = Faraday.new(url: "https://publish.twitter.com") do |conn|
          conn.request :json
          conn.response :json, :content_type => /\bjson$/

          conn.adapter Faraday.default_adapter
        end

        response = connection.get "/oembed", {url: url}
        response.body
      end
    end
  end
end
