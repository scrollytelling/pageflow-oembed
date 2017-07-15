class CreatePageflowOembeds < ActiveRecord::Migration
  def change
    create_table :pageflow_oembed_oembeds do |t|
      t.string :type, null: false, default: ''
      t.string :version, null: false, default: ''
      t.string :url, null: false, default: ''
      t.string :title
      t.string :author_name
      t.string :author_url
      t.text :html
      t.integer :width
      t.integer :height
      t.string :provider_name
      t.string :provider_url
      t.integer :cache_age
      t.string :thumbnail_url
      t.integer :thumbnail_width
      t.integer :thumbnail_height
      t.index :url, unique: true
      t.timestamps
    end
  end
end
