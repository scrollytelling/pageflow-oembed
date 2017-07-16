require 'faraday'
require 'faraday_middleware'

module Pageflow
  module Oembed
    module Providers
      class Twitter
        def initialize(url, params)
          @url = url
          @params = params
        end

        attr_reader :url, :params

        def oembed_response
          # Twitter: GET https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2FInterior%2Fstatus%2F507185938620219395
          connection = Faraday.new(url: "https://publish.twitter.com") do |conn|
            conn.request :json
            conn.response :json, :content_type => /\bjson$/

            conn.adapter Faraday.default_adapter
          end

          response = connection.get "/oembed", {
            url: url,
            omit_script: true,
            related: 'scrollytelling',
            lang: params[:locale] || 'en',
            theme: params[:theme] || 'dark',
            dnt: 'true'
          }

          oembed = response.body
          oembed[:cache_until] = oembed[:cache_age].seconds.from_now
          oembed
        end
      end
    end
  end
end
