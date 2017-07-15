module Pageflow
  module Oembed
    class OembedsController < ApplicationController
      def fetch
        oembed = Oembed.find_or_create_by(url: oembed_params[:url]) do |oembed|
          oembed.attributes = Fetcher.fetch(oembed_params[:url], params: oembed_params.delete(:url))
        end

        if oembed.valid?
          render json: oembed
        else
          render json: {error: oembed.errors, object: oembed}, status: :bad_request
        end
      end

      private

      def oembed_params
        params.require(:oembed).permit(:url, :theme, :locale)
      end
    end
  end
end
