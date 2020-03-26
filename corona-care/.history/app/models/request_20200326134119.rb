class Request < ApplicationRecord
    has_many :responses
    has_many :users, through: :responses
end
