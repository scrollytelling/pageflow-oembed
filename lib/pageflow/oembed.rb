require "pageflow/oembed/version"
require "pageflow/oembed/plugin"
require "pageflow/oembed/widget_type"
require "pageflow/oembed/engine"

module Pageflow
  module Oembed
    def self.widget_type
      WidgetType.new
    end
  end
end
