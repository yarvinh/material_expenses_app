class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.integer :user_id
      t.string  :address
      t.timestamps
    end
  end
end
