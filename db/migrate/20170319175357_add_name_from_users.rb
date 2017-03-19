class AddNameFromUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :name, :string, unique: :true
    add_index :users, :name
  end
end
