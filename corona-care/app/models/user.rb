class User < ApplicationRecord
    has_many :responses
    has_many :messages
    has_many :convos, through: :messages
    has_secure_password
    #has_secure_password comes with the bcrypt gem


    validates :username, presence: true, uniqueness: {case_sensitive: true}
    validates :first_name, presence: true  
    validates :last_name, presence: true  
    validates :city, presence: true  

    validates :password, presence: true, length: {minimum: 1}
    # change this to more when not testing


    # change this so that usernames have to have charactersistics
end
