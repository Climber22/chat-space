FactoryGirl.define do
  factory :group do
    name "test_group"
    created_at { Faker::Time.between(7.days.ago, 4.days.ago, :all) }
    updated_at { Faker::Time.between(3.days.ago, Time.now, :all)}
  end
end
