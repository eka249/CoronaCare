class UserSerializer < ActiveModel::Serializer
  attributes :id, :firstName, :lastName, :username, :city, :phone, :password_digest, :convos, :messages


  def convos
    self.object.convos.map do |convo|
      {id: convo.id}
    end
  end

  def messages
    self.object.map do |message|
      {id: message.id,
        text: message.messagetext,
        convoID: convo.convo_id
      }
    end
  end

      
end
