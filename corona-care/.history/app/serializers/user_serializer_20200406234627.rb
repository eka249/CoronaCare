class UserSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :username, :city, :phone, :password_digest
end
