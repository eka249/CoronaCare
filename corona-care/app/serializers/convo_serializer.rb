class ConvoSerializer < ActiveModel::Serializer
  attributes :id, :fromID, :toID
end
