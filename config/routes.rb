Pageflow::Oembed::Engine.routes.draw do
  post :fetch, to: "oembeds#fetch"
end
