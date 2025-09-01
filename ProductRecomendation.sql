mysql> use product_recommendation_app;
Database changed
mysql> show tables;
+--------------------------------------+
| Tables_in_product_recommendation_app |
+--------------------------------------+
| actions                              |
| categories                           |
| products                             |
| products_2                           |
| subcategory                          |
| user                                 |
| user_interactions                    |
+--------------------------------------+
7 rows in set (0.00 sec)

mysql> desc actions;
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| action_id   | int          | NO   | PRI | NULL    | auto_increment |
| action_name | varchar(100) | NO   | UNI | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
2 rows in set (0.01 sec)

mysql> desc categories;
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| category_id   | int          | NO   | PRI | NULL    | auto_increment |
| category_name | varchar(200) | NO   | UNI | NULL    |                |
| description   | varchar(400) | YES  |     | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)

mysql> desc products_2;
+----------------+----------------------------+------+-----+-------------------+-----------------------------------------------+
| Field          | Type                       | Null | Key | Default           | Extra                                         |
+----------------+----------------------------+------+-----+-------------------+-----------------------------------------------+
| product_id     | int                        | NO   | PRI | NULL              | auto_increment                                |
| product_name   | varchar(100)               | YES  |     | NULL              |                                               |
| product_image  | varchar(300)               | YES  |     | NULL              |                                               |
| subcategory_id | int                        | YES  | MUL | NULL              |                                               |
| brand          | varchar(100)               | YES  |     | NULL              |                                               |
| destcription   | text                       | YES  |     | NULL              |                                               |
| stock_unit     | enum('kg','pices','liter') | YES  |     | NULL              |                                               |
| stock          | decimal(10,2)              | YES  |     | NULL              |                                               |
| price          | decimal(10,2)              | YES  |     | NULL              |                                               |
| discount       | decimal(10,2)              | YES  |     | NULL              |                                               |
| organic        | tinyint(1)                 | YES  |     | NULL              |                                               |
| created_at     | timestamp                  | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at     | timestamp                  | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+----------------+----------------------------+------+-----+-------------------+-----------------------------------------------+
13 rows in set (0.00 sec)

mysql> desc subcategory;
+------------------+--------------+------+-----+---------+----------------+
| Field            | Type         | Null | Key | Default | Extra          |
+------------------+--------------+------+-----+---------+----------------+
| subcategory_id   | int          | NO   | PRI | NULL    | auto_increment |
| subcategory_name | varchar(100) | YES  |     | NULL    |                |
| category_id      | int          | YES  | MUL | NULL    |                |
+------------------+--------------+------+-----+---------+----------------+
3 rows in set (0.00 sec)

mysql> desc user;
+------------+----------------------+------+-----+---------+----------------+
| Field      | Type                 | Null | Key | Default | Extra          |
+------------+----------------------+------+-----+---------+----------------+
| user_id    | int                  | NO   | PRI | NULL    | auto_increment |
| user_name  | varchar(100)         | NO   |     | NULL    |                |
| user_email | varchar(50)          | NO   | UNI | NULL    |                |
| password   | varchar(400)         | YES  |     | NULL    |                |
| user_type  | enum('admin','user') | YES  |     | NULL    |                |
+------------+----------------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)

mysql> desc user_interactions;
+---------------+------+------+-----+---------+----------------+
| Field         | Type | Null | Key | Default | Extra          |
+---------------+------+------+-----+---------+----------------+
| user_inter_id | int  | NO   | PRI | NULL    | auto_increment |
| user_id       | int  | YES  | MUL | NULL    |                |
| product_id    | int  | YES  | MUL | NULL    |                |
| action_id     | int  | YES  | MUL | NULL    |                |
+---------------+------+------+-----+---------+----------------+
4 rows in set (0.00 sec)