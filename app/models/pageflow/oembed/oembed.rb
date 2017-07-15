module Pageflow
  module Oembed
    class Oembed < ApplicationRecord
      validates_presence_of :url
      validates_uniqueness_of :url
    end
  end
end
