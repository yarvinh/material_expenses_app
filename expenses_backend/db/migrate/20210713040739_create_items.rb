class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.integer :location_id
      t.integer :user_id
      t.integer :receipt_id
      t.string  :item_name
      t.string :price 
      t.string :image
      t.timestamps
    end
  end
end
