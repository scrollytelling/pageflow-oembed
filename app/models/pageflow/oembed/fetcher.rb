module Pageflow
  module Oembed
    class Fetcher
      def initialize(url)
        @url = url
      end

      attr_reader :url

      def attributes
        {
          url: url
        }
      end
    end
  end
end
