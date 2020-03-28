class User < ApplicationRecord
    has_many :responses
    has_many :messages
    has_many :convos, through: :messages

    # validates :email, uniqueness: true 
    # ,case_sensitive: true
end
