class DropTableUsersgroups < ActiveRecord::Migration[5.0]
  def change
    drop_table :users_groups
  end
end
