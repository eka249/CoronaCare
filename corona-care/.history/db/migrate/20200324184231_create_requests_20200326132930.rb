class CreateRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :requests do |t|
      t.integer :user_ID
      t.string :title
      t.text :description
      t.string :category
      t.timestamps
    end
  end
end
