class Receipt < ApplicationRecord
    belongs_to :location
    has_many :items

    validates :project_name, presence: true
end
