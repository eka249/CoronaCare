class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      # this userID is the person who is sending the message. the person recieving is irrelevant for this model
      t.integer :user_id
      t.integer :convo_id
      t.text :messagetext
      t.timestamps
    end
  end
end
