FactoryGirl.define do
  pwd = Faker::Internet.password(8)
  factory :user do
    email { Faker::Internet.email }
    password pwd
    password_confirmation pwd
    created_at { Faker::Time.between(7.days.ago, 4.days.ago, :all) }
    updated_at { Faker::Time.between(3.days.ago, Time.now, :all) }
    name { Faker::Name.name }
    after(:create) do |user|
      user.groups << create(:group)
    end
  end
end
