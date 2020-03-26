class CreateResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :responses do |t|
      t.integer :user_ID
      # user_ID is the person clicking "I want to do this job". the request ID is present, so requester is not relevant
      t.integer :request_ID
      t.timestamps
    end
  end
end
