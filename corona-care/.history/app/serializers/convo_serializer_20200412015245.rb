class ConvoSerializer < ActiveModel::Serializer
  attributes :id, :fromID, :toID, :full_conversation, :from, :to

  def full_conversation
    Convo.all.map do |convo| 
      Message.where(convo_id: convo.id)
    end
  end

  def to
    user = User.all
    Convo.all.map do |convo|
      user.find_by(id: convo.toID)
      {username: user.username}
    end
  end

  def from
    User.all.map do |user|
      Convo.where(fromID: user.id)
      {username: user.username}
    end
  end

end
