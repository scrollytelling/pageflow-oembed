require 'pageflow/widget_type'

module Pageflow
  module Oembed
    class WidgetType < ::Pageflow::WidgetType
      def name
        'pageflow_oembed'
      end

      def roles
        ['oembed']
      end

      def render(template, entry)
        template.render(
          partial: "pageflow/oembed/widget.html.erb",
          locals: {
            entry: entry
          }
        )
      end
    end
  end
end
