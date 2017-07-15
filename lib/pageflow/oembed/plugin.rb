require 'pageflow/plugin'

module Pageflow
  module Oembed
    class Plugin < ::Pageflow::Plugin
      def configure(config)
        config.widget_types.register(Pageflow::Oembed.widget_type, default: true)
      end
    end
  end
end
