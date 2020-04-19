class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :firstName
      t.string :lastName
      t.integer :phone, :limit => 8
      t.string :username
      t.string :city
      t.string :password_digest
      t.timestamps
    end

    add_index :users, %i(username), unique: true

  end
end
