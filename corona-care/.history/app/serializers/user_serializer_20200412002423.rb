class UserSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :username, :city, :phone, :password_digest, :conversations, :messages
  
  def conversations
    self.object.convos.map do |convo|
      {id: convo.id,
      messages: self.full_conversation}
    end
  end

  def full_conversation
    Convo.all.map do |convo| 
      Message.where(convo_id: convo.id)
      # {text: Message.messagetext}
    end
    # return :json
  end


  def messages
    self.object.messages.map do |message|
      {id: message.id,
        text: message.messagetext,
        convoID: message.convo_id
      }
    end
  end

      
end
