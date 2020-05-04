class RequestSerializer < ActiveModel::Serializer
  attributes :id, :user_ID, :title, :description, :category, :location
end
