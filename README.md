# Definition of Database

## messages table
|column|type|option|
|:--|:--|:--|
|body|text||
|image|string||
|group_id|references|null:false|
|user_id|references|null:false|
|created_at|datetime|null:false|
|updated_at|datetime|null:false

## users table
|column|type|option|
|:--|:--|:--|
|e-mail|string|null:false,unique:true|
|password|string|null:false|
|name|string|null:false,attach index|

## groups table
|column|type|
|:--|:--|
|group_name|string|null:false|

## group_users table
### (for connecting users and groups as n : m)
|column|type|
|:--|:--|
|group_id|references|
|user_id|references|

# association definition

## users table & groups table
m:n (=>through users_groups table)

## users table & messages table
1:n

## groups table & messages table
1:n



