require 'faraday'
require 'faraday_middleware'

module Pageflow
  module Oembed
    module Providers
      # Supported URLs:
      #
      #   open.spotify.com/track/298gs9ATwr2rD9tGYJKlQR
      #   open.spotify.com/artist/0IIPgITtEO4JJfipw57KGv
      class Spotify
        def initialize(url, params)
          @url = url
          @params = params
        end

        attr_reader :url, :params

        def oembed_response
          # Spotify: GET https://open.spotify.com/oembed?url=http://open.spotify.com/track/298gs9ATwr2rD9tGYJKlQR
          connection = Faraday.new({
            url: "https://open.spotify.com",
            headers: {user_agent: user_agent}
          }) do |conn|
            conn.request :json
            conn.response :json, :content_type => /\bjson$/

            conn.adapter Faraday.default_adapter
          end

          response = connection.get "/oembed", {
            url: url
          }

          response.body
        end

        private

        def user_agent
          "Pageflow Oembed #{Pageflow::Oembed::VERSION}/Faraday #{Faraday::VERSION}"
        end
      end
    end
  end
end
