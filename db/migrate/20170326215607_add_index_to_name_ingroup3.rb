class AddIndexToNameIngroup3 < ActiveRecord::Migration[5.0]
  def change
    add_column :groups, :name, :string, null: false
  end
end
