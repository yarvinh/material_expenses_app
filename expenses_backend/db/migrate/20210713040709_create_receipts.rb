class CreateReceipts < ActiveRecord::Migration[6.0]
  def change
    create_table :receipts do |t|
      t.integer :user_id
      t.integer :location_id
      t.string  :project_name
      t.timestamps
    end
  end
end
