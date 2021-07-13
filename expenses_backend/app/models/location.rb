class Location < ApplicationRecord
    belongs_to :user
    has_many :receipts
    has_many :items, through: :receipts

    validates :address, presence: true
end
