class User < ApplicationRecord
    has_many :responses
    has_many :messages
    has_many :convos, through: :messages
    has_secure_password


    validates :username, presence: true
    validates :username,  uniqueness: {case_sensitive: true}
    validates :password, length: {minimum: 1}
    # change this to more when not testing


    # change this so that usernames have to have charactersistics
end
