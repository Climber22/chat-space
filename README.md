== README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
#Definition of Database

##messages table
|column|type|option|
|:--|:--|:--|
|body|text||
|image|string||
|group_id|integer|null:false|
|user_id|integer|null:false|
|created_at|datetime|null:false|
|updated_at|datetime|null:false

##user
|column|type|option|
|:--|:--|:--|
|e-mail|string|null:false,unique:true|
|password|string|null:false|
|user_name|string|null:false,attach index|

##groups
|column|type|
|:--|:--|
|group_name|string|null:false|

##users_groups
###(for connecting users and groups as n : m)
|column|type|
|:--|:--|
|groups_id|integer|
|users_id|integer|
* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


Please feel free to use a different markup language if you do not plan to run
<tt>rake doc:app</tt>.
