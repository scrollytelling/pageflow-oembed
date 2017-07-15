Pageflow::Oembed::Engine.routes.draw do
  namespace :pageflow do
    post :oembed, to: "fetch"
  end
end
