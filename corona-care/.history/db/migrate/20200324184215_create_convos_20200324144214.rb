class CreateConvos < ActiveRecord::Migration[5.2]
  def change
    create_table :convos do |t|

      t.timestamps
    end
  end
end
