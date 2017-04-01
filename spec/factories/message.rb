FactoryGirl.define do
  factory :message do
    body "text"
    created_at { Faker::Time.between(7.days.ago, 4.days.ago, :all) }
    updated_at { Faker::Time.between(3.days.ago, Time.now, :all) }
    user
    group
  end
end
