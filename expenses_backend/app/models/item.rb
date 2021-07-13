class Item < ApplicationRecord
    belongs_to :receipt
    belongs_to :user
    validates :item_name, presence: true
    validates :price, presence: true, numericality: { only_integer: true }
end
