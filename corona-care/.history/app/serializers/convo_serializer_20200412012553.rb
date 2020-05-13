class ConvoSerializer < ActiveModel::Serializer
  attributes :id, :fromID, :toID, :full_conversation, :to, :from

  def full_conversation
    Convo.all.map do |convo| 
      Message.where(convo_id: convo.id)
    end
    # return :json
  end

  def to 
    User.all.map do |user|
      Convo.where(toID: user.id)
      {email: user.email}

    end
  end

  def from
    User.all.map do |user|
      Convo.where(fromID: user.id)
      {email: user.email}
    end
  end

end
