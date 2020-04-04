class MessageSerializer < ActiveModel::Serializer
  attributes :id, :request, :response
end
