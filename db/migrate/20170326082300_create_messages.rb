class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text :body, null: false
      t.references :user_id, null: false
      t.references :group_id, null: false
      t.timestamps
    end
  end
end
