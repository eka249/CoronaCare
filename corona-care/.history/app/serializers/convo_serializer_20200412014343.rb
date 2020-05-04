class ConvoSerializer < ActiveModel::Serializer
  attributes :id, :fromID, :toID, :full_conversation, :from, :user
  # , :to

  def full_conversation
    Convo.all.map do |convo| 
      Message.where(convo_id: convo.id)
    end
  end

  # def to 
  #   User.find_by(Convo.toID: User.id)
  #     {username: user.username}

  # end

  def from
    User.all.map do |user|
      Convo.where(fromID: user.id)
      {username: user.username}
    end
  end

end
