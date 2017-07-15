require 'rails/engine'

module Pageflow
  module Oembed
    class Engine < ::Rails::Engine
      isolate_namespace Pageflow::Oembed
    end
  end
end
