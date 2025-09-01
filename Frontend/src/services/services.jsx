// import axios from "axios";
// import App from "../App";

// const api=axios.create({
//     baseURL: "http://localhost:3000",
// });


// export const viewProducts=()=>{
//     console.log("Fetching products from API");
//     return api.get("/viewProducts");
// }


// export const addProduct = (data, config = {}) => {
//   return api.post("/addProduct_2", data, config);
// };

// export const getSubCategoriesNameId = () => {
//   return api.get("/getSubCategoriesNameId");
// };

// export const loginService = (email, password) => {
//   return api.post("/userlogin", { email, password });
// };
// // export const adminLogin

// export const getUserByToken = (token) => {
//   return api.get("/getUserByToken", {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });
// };

// // ✅ Correct way
// export const deletProductById = (product_id) => {
//   return api.get("/deleteProduct", {
//     params: { product_id }  // this will send ?product_id=12
//   });
// };



import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// 🔑 Interceptor: Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const viewProducts = () => {
  console.log("Fetching products from API");
  return api.get("/viewProducts");
};

export const addProduct = (data, config = {}) => {
  return api.post("/addProduct_2", data, config);
};

export const getSubCategoriesNameId = () => {
  return api.get("/getSubCategoriesNameId");
};

export const loginService = (email, password) => {
  return api.post("/userlogin", { email, password });
};

export const getUserByToken = () => {
  return api.get("/getUserByToken"); // 🔥 no need to manually pass token
};

export const deletProductById = (product_id) => {
  return api.get("/deleteProduct", {
    params: { product_id }, // ?product_id=12
  });
};
