class CreateUserGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :users_groups do |t|
      t.references :groups_id
      t.references :users_id
      t.timestamps
    end
  end
end
