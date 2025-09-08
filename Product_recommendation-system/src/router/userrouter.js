import express from "express";
import * as usercontrol from "../controler/usercontrol.js";

const userRouter = express.Router();

// Routes
userRouter.post("/addToCart",  usercontrol.addToCart);
userRouter.get("/getCatagory",usercontrol.getCatagory);
userRouter.get("/getSubCatagory",usercontrol.getSubCatagory);
userRouter.get("/getProducts",usercontrol.getProducts);

userRouter.post("/addViewAction",usercontrol.addViewAction);
userRouter.post("/getViewAction", usercontrol.getViewAction);
userRouter.post("/deleteViewAction", usercontrol.deleteViewAction);

userRouter.post("/addAddToCartAction",usercontrol.addAddToCartAction);
userRouter.post("/deleteAddToCartAction",usercontrol.deleteAddToCartAction);

userRouter.post("/addPurchaseAction",usercontrol.addPurchaseAction);
userRouter.post("/addOrder",usercontrol.addOrder);
userRouter.post("/addOrderItems",usercontrol.addOrderItems);
userRouter.get("/getReletedProducts",usercontrol.getReletedProducts);
userRouter.get("/getProductById", usercontrol.getProductById);
userRouter.get("/getCartItems", usercontrol.getCartItems);
userRouter.post("/updateCartItem", usercontrol.updateCartItem);
userRouter.post("/removeCartItem", usercontrol.removeCartItem);
userRouter.get("/getOrderDetails", usercontrol.getOrderDetails);
userRouter.post("/deleteOrderById", usercontrol.deleteOrderById);
userRouter.get("/getBstOffers", usercontrol.getBstOffers);

userRouter.post("/editUser", usercontrol.editUser);
userRouter.post("/updateUserPassword", usercontrol.updateUserPassword);


userRouter.post("/getRecommendations",usercontrol.getRecommendations);


// export router
export default userRouter;
