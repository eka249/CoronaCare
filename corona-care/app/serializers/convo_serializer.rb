class ConvoSerializer < ActiveModel::Serializer
  attributes :id, :fromID, :toID, :messages
  # :full_conversation, 

  def full_conversation
    # Convo.all.map do |convo| 
      # Message.where(convo_id: convo.id)
    # end
  end

end
