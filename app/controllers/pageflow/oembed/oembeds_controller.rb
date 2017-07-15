module Pageflow
  module Oembed
    class OembedsController < ApplicationController
      def fetch
        url = params[:oembed][:url]
        oembed = Oembed.find_or_create_by(url: url) do |oembed|
          oembed.attributes = Fetcher.fetch(url)
        end

        if oembed.valid?
          render json: oembed
        else
          render json: {error: oembed.errors, object: oembed}, status: :bad_request
        end
      end
    end
  end
end
