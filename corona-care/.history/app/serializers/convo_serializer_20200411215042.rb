class ConvoSerializer < ActiveModel::Serializer
  attributes :id, :fromID, :toID, :user
end
