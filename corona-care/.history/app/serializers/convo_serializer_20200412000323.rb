class ConvoSerializer < ActiveModel::Serializer
  attributes :id, :fromID, :toID

  # def full_conversation
  #   Convo.all.map do |convo| 
  #     Message.where(convo_id: convo.id)

  #   end
  #   # return :json
  # end

end