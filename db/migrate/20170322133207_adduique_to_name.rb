class AdduiqueToName < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :name
    add_column :users, :name, :string, unique: true
    add_index :users, :name
  end
end
