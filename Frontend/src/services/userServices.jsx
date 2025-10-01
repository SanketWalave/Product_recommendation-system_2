import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/user",
});

// ✅ Fixed spelling to match backend
export const getCategory = () => {
  return api.get("/getCatagory");
};

export const getSubCategory = () => {
  return api.get("/getSubCatagory");
};

export const getProducts = () => {
  return api.get("/getProducts");
};

export const addToCart = (data) => {
    // alert(data );
  return api.post("/addToCart", data);
};

export const addViewAction = (data) => {
  return api.post("/addViewAction", data);
};

export const getProductById = (product_id) => {
  return api.get("/getProductById", {
    params: { product_id }
  });
};
export const getRelatedProducts = (product_id) => {
  // alert(product_id);
  return api.get("/getReletedProducts", {
    params: { product_id }
  });
};


  // getCartItems,
  // updateCartItem,
  // addOrder,
export const getCartItems = (user_id) => {
  return api.get("/getCartItems", {
    params: { user_id }
  });
}
export const updateCartItem = ({ user_id, product_id, quantity }) => {
  console.log("Updating cart:", user_id, product_id, quantity);
  return api.post("/updateCartItem", { user_id, product_id, quantity });
};

export const addOrder = (data) => {
  return api.post("/addOrder", data);
}

export const getOrders = (user_id) => {
  
  return api.get("/getOrderDetails", {
    params: { user_id }
  }); 
}

// export const deleteOrderById = (order_id) => {
//   return api.post("/deleteOrderById", {
//     params: { order_id }
//   });
// }
// userServices.js
export const deleteOrderById = (orderId) => {
  return api.post("/deleteOrderById", { order_id: orderId });
};

export const addAddToCartAction = (user_id, product_id) => {
  return api.post("/addAddToCartAction", { user_id, product_id });
};

export const getRecommendations = (user_id) => {
  return api.post("/getRecommendations", {user_id});
}

export const removeCartItem = ({ user_id, product_id }) => {
  return api.post("/removeCartItem", { user_id, product_id });
}

export const getViewAction = (user_id) => {
  return api.post("/getViewAction",  { user_id });
}
export const removeFromWishlist = ({ user_id, product_id }) => {
  return api.post("/deleteViewAction", { user_id, product_id });
}
export const deleteAddToCartAction = (user_id, product_id) => {
  return api.post("/deleteAddToCartAction", { user_id, product_id });
}

export const getBstOffers = () => {
  return api.get("/getBstOffers");
}

// editUser,updateUserPassword 
// userServices.js

export const editUser = ({ id, uname, email }) => {
  const payload = {
    user_id: id,
    user_name: uname,
    user_email: email,
  };
  console.log("Sending to API:", payload);
  return api.post("/editUser", payload);
};

export const updateUserPassword = ({ user_id, old_password, new_password }) => {
  console.log("in services", { user_id, old_password, new_password });
  return api.post("/updateUserPassword", { user_id, old_password, new_password });
};

