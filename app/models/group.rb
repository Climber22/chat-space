class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users

  # 以下の記述でgroupを保存した際に同時にuserも保存してくれるようになる
  accepts_nested_attributes_for :users
end
