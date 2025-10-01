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


mysql> desc actions;
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| action_id   | int          | NO   | PRI | NULL    | auto_increment |
| action_name | varchar(100) | NO   | UNI | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
2 rows in set (0.01 sec)

mysql> desc cart;
+------------+-----------+------+-----+-------------------+-------------------+
| Field      | Type      | Null | Key | Default           | Extra             |
+------------+-----------+------+-----+-------------------+-------------------+
| cart_id    | int       | NO   | PRI | NULL              | auto_increment    |
| user_id    | int       | NO   | MUL | NULL              |                   |
| product_id | int       | NO   | MUL | NULL              |                   |
| quantity   | int       | YES  |     | 1                 |                   |
| added_at   | timestamp | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+-----------+------+-----+-------------------+-------------------+
5 rows in set (0.02 sec)

mysql> desc orders;
+------------+----------------------------------------------------------+------+-----+-------------------+-------------------+
| Field      | Type                                                     | Null | Key | Default           | Extra             |
+------------+----------------------------------------------------------+------+-----+-------------------+-------------------+
| order_id   | int                                                      | NO   | PRI | NULL              | auto_increment    |
| user_id    | int                                                      | NO   | MUL | NULL              |                   |
| order_date | timestamp                                                | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| status     | enum('pending','paid','shipped','completed','cancelled') | YES  |     | pending           |                   |
| total      | decimal(10,2)                                            | YES  |     | NULL              |                   |
+------------+----------------------------------------------------------+------+-----+-------------------+-------------------+
5 rows in set (0.00 sec)

mysql> desc order_items;
+---------------+---------------+------+-----+---------+----------------+
| Field         | Type          | Null | Key | Default | Extra          |
+---------------+---------------+------+-----+---------+----------------+
| order_item_id | int           | NO   | PRI | NULL    | auto_increment |
| order_id      | int           | NO   | MUL | NULL    |                |
| product_id    | int           | NO   | MUL | NULL    |                |
| quantity      | int           | NO   |     | NULL    |                |
| price         | decimal(10,2) | NO   |     | NULL    |                |
+---------------+---------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)

mysql> select *from actions order by action_id ;
+-----------+---------------+
| action_id | action_name   |
+-----------+---------------+
|         1 | viewd         |
|         2 | added_to_cart |
|         3 | purchased     |
+-----------+---------------+
3 rows in set (0.00 sec)


//=========================================
//      Queris
//=========================================


CREATE DATABASE IF NOT EXISTS product_recommendation_app;
USE product_recommendation_app;

CREATE TABLE IF NOT EXISTS categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(200) NOT NULL UNIQUE,
    description VARCHAR(400)
);

CREATE TABLE IF NOT EXISTS subcategory (
    subcategory_id INT PRIMARY KEY AUTO_INCREMENT,
    subcategory_name VARCHAR(100),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS products_2 (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100),
    product_image VARCHAR(300),
    subcategory_id INT,
    brand VARCHAR(100),
    destcription TEXT,
    stock_unit ENUM('kg', 'pices', 'liter'),
    stock DECIMAL(10,2),
    price DECIMAL(10,2),
    discount DECIMAL(10,2),
    organic TINYINT(1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (subcategory_id) REFERENCES subcategory(subcategory_id)
);

CREATE TABLE IF NOT EXISTS user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(400),
    user_type ENUM('admin', 'user')
);

CREATE TABLE IF NOT EXISTS actions (
    action_id INT PRIMARY KEY AUTO_INCREMENT,
    action_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_interactions (
    user_inter_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    action_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (product_id) REFERENCES products_2(product_id),
    FOREIGN KEY (action_id) REFERENCES actions(action_id)
);

CREATE TABLE IF NOT EXISTS cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (product_id) REFERENCES products_2(product_id)
);

CREATE TABLE IF NOT EXISTS orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled') DEFAULT 'pending',
    total DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products_2(product_id)
);

//==========================
//   Trigers
//==========================

DDELIMITER $$

CREATE TRIGGER after_order_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    -- Insert all cart items into order_items
    INSERT INTO order_items (order_id, product_id, quantity, price)
    SELECT 
        NEW.order_id, 
        c.product_id, 
        c.quantity, 
        p.price
    FROM cart c
    JOIN products_2 p ON c.product_id = p.product_id
    WHERE c.user_id = NEW.user_id;

    -- Clear the cart for that user
    DELETE FROM cart WHERE user_id = NEW.user_id;
END$$

DELIMITER ;


