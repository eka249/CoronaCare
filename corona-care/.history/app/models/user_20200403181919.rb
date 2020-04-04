class User < ApplicationRecord
    has_many :responses
    has_many :messages
    has_many :convos, through: :messages
    has_secure_password

    validates :username, uniqueness: {case_sensitive: true} 
end
