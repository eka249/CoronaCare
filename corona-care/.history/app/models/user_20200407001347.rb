class User < ApplicationRecord
    has_many :responses
    has_many :messages
    has_many :convos, through: :messages
    has_secure_password

    validates :username, presence: true
    , uniqueness: {case_sensitive: true} 
    # change this so that usernames have to have charactersistics
end