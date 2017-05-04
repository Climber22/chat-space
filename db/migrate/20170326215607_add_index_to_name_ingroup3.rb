class AddIndexToNameIngroup3 < ActiveRecord::Migration[5.0]
  def change
    remove_column :groups, :name, :string
    add_column :groups, :name, :string
    change_column :groups, :name, :string, {null: false}
  end
end
