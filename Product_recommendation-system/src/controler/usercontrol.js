import e from "express";
import * as usermodel from "../model/usermodel.js";
import bcrypt from "bcrypt";



export const addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  console.log(user_id, product_id, quantity);
  usermodel
    .addToCart(user_id, product_id, quantity)
    .then((results) => {
      res.status(200).json({ message: "Product added to cart", data: results });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const getCatagory = (req, res) => {
  usermodel
    .getCatagory()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const getSubCatagory = (req, res) => {
  usermodel
    .getSubCatagory()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const getProducts = (req, res) => {
  usermodel
    .getProducts()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
export const addViewAction = (req, res) => {
  const { user_id, product_id } = req.body;
  usermodel
    .addViewAction(user_id, product_id)
    .then((results) => {
      res.status(200).json({ message: "View action added", data: results });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
export const getViewAction = (req, res) => {
  const user_id = req.body.user_id;
  usermodel
    .getViewAction(user_id)
    .then((results) => {
      res.status(200).json({ message: "View action fetched", data: results });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const deleteViewAction = (req, res) => {
  const { user_id, product_id } = req.body;
  usermodel
    .deleteViewAction(user_id, product_id)
    .then((results) => {
      res.status(200).json({ message: "View action deleted", data: results });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const addAddToCartAction = (req, res) => {
  const { user_id, product_id } = req.body;
  usermodel
    .addAddToCartAction(user_id, product_id)
    .then((results) => {
      res
        .status(200)
        .json({ message: "Add to cart action added", data: results });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const deleteAddToCartAction = (req, res) => {
    // console.log("in delete cart action"+ req.body);
    
  const { user_id, product_id } = req.body;
  usermodel
    .deleteAddToCartAction(user_id, product_id)
    .then((results) => {
      res
        .status(200)
        .json({ message: "Add to cart action deleted", data: results });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const addPurchaseAction = (req, res) => {
  const { user_id, product_id } = req.body;
  usermodel
    .addPurchaseAction(user_id, product_id)
    .then((results) => {
      res.status(200).json({ message: "Purchase action added", data: results });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
export const getRecommendations = (req, res) => {
  console.log(req.body);
  const { user_id } = req.body;
  console.log(user_id);
  usermodel
    .getRecommendations(user_id)
    .then((results) => {
      res
        .status(200)
        .json({ message: "Recommendations fetched", data: results });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const addOrder = (req, res) => {
  console.log("Order "+req.body);
  const { user_id, total_amount } = req.body;
  usermodel
    .addOrder(user_id, total_amount)
    .then((results) => {
      res
        .status(200)
        .json({ message: "Order placed successfully", data: results });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const addOrderItems = (req, res) => {
  const { order_id, product_id, quantity, price } = req.body;
  usermodel
    .addOrderItems(order_id, product_id, quantity, price)
    .then((results) => {
      res
        .status(200)
        .json({ message: "Order items added successfully", data: results });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const getReletedProducts = (req, res) => {
  console.log("in getReletedProducts" + req.body, req.query);
  const product_id = req.query.product_id || req.body?.product_id;
  if (!product_id) {
    return res.status(400).json({ error: "product_id is required" });
  }
  usermodel
    .getReletedProducts(product_id)
    .then((results) => {
      res
        .status(200)
        .json({ message: "Related products fetched", data: results });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
// export const getProductById=(req,res)=>{
//     console.log(req.body);
//     const {product_id}=req.body;
//     usermodel.getProductById(product_id)
//     .then(results=>{
//         res.status(200).json({message:"Product fetched by ID",data:results});
//     })
//     .catch(err=>{
//         res.status(500).json({error:err.message});
//     })
// }
export const getProductById = (req, res) => {
  // Support both GET (query) and POST (body)
  //   console.log(req.body, req.query);
  const product_id = req.query.product_id || req.body?.product_id;
  if (!product_id) {
    return res.status(400).json({ error: "product_id is required" });
  }
  usermodel
    .getProductById(product_id)
    .then((product) => res.json(product))
    .catch((err) => {
      console.error("Error fetching product by ID:", err);
      res.status(500).json({ error: "Error fetching product by ID" });
    });
};

export const getCartItems = (req, res) => {
  const user_id = req.query.user_id || req.body?.user_id;
  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }
  usermodel
    .getCartItems(user_id)
    .then((cartItems) => res.json(cartItems))
    .catch((err) => {
      console.error("Error fetching cart items:", err);
      res.status(500).json({ error: "Error fetching cart items" });
    });
};
export const removeCartItem = (req, res) => {
  const { user_id, product_id } = req.body;
  if (!user_id || !product_id) {
    return res
      .status(400)
      .json({ error: "user_id and product_id are required" });
  }
  usermodel
    .removeCartItem(user_id, product_id)
    .then((result) => {
      res
        .status(200)
        .json({ message: "Cart item removed successfully", data: result });
    })
    .catch((err) => {
      console.error("Error removing cart item:", err);
      res.status(500).json({ error: "Error removing cart item" });
    });
};

export const updateCartItem = (req, res) => {
  console.log(req.body);
  const { user_id, product_id, quantity } = req.body;
  if (!user_id || !product_id || quantity == null) {
    return res
      .status(400)
      .json({ error: "user_id, product_id and quantity are required" });
  }
  usermodel
    .updateCartItem(user_id, product_id, quantity)
    .then((result) => {
      res
        .status(200)
        .json({ message: "Cart item updated successfully", data: result });
    })
    .catch((err) => {
      console.error("Error updating cart item:", err);
      res.status(500).json({ error: "Error updating cart item" });
    });
};

export const getOrderDetails = (req, res) => {
  const user_id = req.query.user_id || req.body?.user_id;
  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }
  usermodel
    .getOrderDetails(user_id)
    .then((orders) => res.json(orders))
    .catch((err) => {
      console.error("Error fetching order details:", err);
      res.status(500).json({ error: "Error fetching order details" });
    });
};
export const deleteOrderById = (req, res) => {
  console.log(req.body, req.params, req.query);
  // Order ID can come from params, query, or body
  const order_id =
    req.params.order_id || req.body.order_id || req.query.order_id;

  if (!order_id) {
    return res.status(400).json({ error: "order_id is required" });
  }

  console.log("Deleting order with ID:", order_id);

  usermodel
    .deleteOrderById(order_id)
    .then((result) => {
      res.status(200).json({
        message: "Order deleted successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.error("Error deleting order:", err);
      res.status(500).json({ error: "Error deleting order" });
    });
};
export const getBstOffers = (req, res) => {
  usermodel
    .getBstOffers()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const editUser = (req, res) => {
    console.log(req.body);
  const { user_id, user_name, user_email } = req.body;
    if (!user_id || !user_name || !user_email) {    
        return res.status(400).json({ error: "user_id, user_name and user_email are required" });
    }
    usermodel
    .editUser(user_id, user_name, user_email)
    .then((result) => {
      res
        .status(200)
        .json({ message: "User updated successfully", data: result });
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      res.status(500).json({ error: "Error updating user" });
    });
};export const updateUserPassword = (req, res) => {
  const { user_id, old_password, new_password } = req.body;

  if (!user_id || !old_password || !new_password) {
    return res.status(400).json({ error: "user_id, old_password and new_password are required" });
  }

  usermodel.getUserById(user_id)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];
      console.log("User found:", user);

      const isMatch = bcrypt.compareSync(old_password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid old password" });
      }

      return bcrypt.hash(new_password, 10);
    })
    .then((hashedPassword) => {
      return usermodel.updateUserPassword(user_id, hashedPassword);
    })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Password updated successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.error("Error updating password:", err);
      res.status(500).json({
        success: false,
        message: "Error updating password",
        error: err.message || err,
      });
    });
};
