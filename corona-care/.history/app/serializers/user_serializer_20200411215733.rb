class UserSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :username, :city, :phone, :password_digest, :conversations, :messages


  def conversations
    self.object.convos.map do |convo|
      {id: convo.id}
    end
  end

  def messages
    self.object.messages.map do |message|
      {id: message.id,
        text: message.messagetext,
        convoID: convo.convo_id
      }
    end
  end

      
end
