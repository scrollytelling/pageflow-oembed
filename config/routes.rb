Pageflow::Oembed::Engine.routes.draw do
  namespace :pageflow do
    post :oembed, to: "oembeds#fetch"
  end
end
