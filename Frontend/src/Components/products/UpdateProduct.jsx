// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getProductById,
//   updateProductById,
//   getSubCategoriesNameId,
// } from "../../services/services";

// const UpdateProduct = () => {
//   const { id } = useParams(); // ✅ get product_id from route
//   const navigate = useNavigate();

//   const [product, setProduct] = useState({
//     product_name: "",
//     brand: "",
//     destcription: "",
//     price: "",
//     discount: "",
//     stock: "",
//     stock_unit: "",
//     organic: 0,
//     subcategory_id: "",
//   });

//   const [subCategories, setSubCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch product + subcategories
//   useEffect(() => {
//     Promise.all([getProductById(id), getSubCategoriesNameId()])
//       .then(([productRes, subCatRes]) => {
//         if (productRes && productRes.data) {
//           setProduct(productRes.data.data); // assuming backend returns { data: {...} }
//         }
//         if (subCatRes && subCatRes.data && Array.isArray(subCatRes.data.data)) {
//           setSubCategories(subCatRes.data.data);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         alert("Failed to fetch product details.");
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   // ✅ Handle form changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Submit update
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateProductById(id, product)
//       .then(() => {
//         alert("✅ Product updated successfully!");
//         navigate("/products"); // go back to product list
//       })
//       .catch((err) => {
//         console.error("Update failed:", err);
//         alert("❌ Failed to update product.");
//       });
//   };

//   if (loading) return <p className="text-center mt-5">⏳ Loading product...</p>;

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Update Product</h2>
//       <form onSubmit={handleSubmit} className="row g-3">
//         <div className="col-md-6">
//           <label className="form-label">Product Name</label>
//           <input
//             type="text"
//             name="product_name"
//             value={product.product_name}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Brand</label>
//           <input
//             type="text"
//             name="brand"
//             value={product.brand}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="col-12">
//           <label className="form-label">Description</label>
//           <textarea
//             name="destcription"
//             value={product.destcription}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Price</label>
//           <input
//             type="number"
//             name="price"
//             value={product.price}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Discount (%)</label>
//           <input
//             type="number"
//             name="discount"
//             value={product.discount}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">Stock</label>
//           <input
//             type="number"
//             name="stock"
//             value={product.stock}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Stock Unit</label>
//           <input
//             type="text"
//             name="stock_unit"
//             value={product.stock_unit}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Organic</label>
//           <select
//             name="organic"
//             value={product.organic}
//             onChange={handleChange}
//             className="form-select"
//           >
//             <option value={1}>Yes</option>
//             <option value={0}>No</option>
//           </select>
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Subcategory</label>
//           <select
//             name="subcategory_id"
//             value={product.subcategory_id}
//             onChange={handleChange}
//             className="form-select"
//           >
//             <option value="">Select Subcategory</option>
//             {subCategories.map((sub) => (
//               <option key={sub.subcategory_id} value={sub.subcategory_id}>
//                 {sub.subcategory_name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="col-12">
//           <button type="submit" className="btn btn-success">
//             ✅ Update Product
//           </button>
//           <button
//             type="button"
//             className="btn btn-secondary ms-2"
//             onClick={() => navigate(-1)}
//           >
//             ⬅ Back
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;
