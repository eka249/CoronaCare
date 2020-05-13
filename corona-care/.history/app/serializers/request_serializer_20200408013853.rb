class RequestSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :description, :category, :location
end
