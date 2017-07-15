module Pageflow
  module Oembed
    class OembedsController < ApplicationController
      def fetch
        url = params[:oembed][:url]
        oembed = Oembed.find_or_create_by(url: url) do |oembed|
          oembed.attributes = Fetcher.new(url).attributes
        end

        render json: oembed
      end
    end
  end
end
