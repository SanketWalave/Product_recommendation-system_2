import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductDetailsById,
  updateProductPost,
  getSubCategoriesNameId,
} from "../../services/services";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [subcategories, setSubcategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  // fetch product details + subcategories
  useEffect(() => {
    if (id) {
      getProductDetailsById(id)
        .then((res) => {
          if (res.data && res.data.data && res.data.data[0]) {
            setProduct(res.data.data[0]);
          }
        })
        .catch((err) => console.error("Error fetching product:", err));
    }

    getSubCategoriesNameId()
      .then((res) => {
        setSubcategories(res.data.data || []);
      })
      .catch((err) => console.error("Error fetching subcategories:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_id", product.product_id);
    formData.append("product_name", product.product_name);
    formData.append("brand", product.brand);
    formData.append("destcription", product.destcription);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("stock_unit", product.stock_unit);
    formData.append("discount", product.discount);
    formData.append("organic", product.organic);
    formData.append("subcategory_id", product.subcategory_id);
    if (imageFile) formData.append("product_image", imageFile);

    updateProductPost(formData)
      .then(() => {
        alert("✅ Product updated successfully!");
        navigate("/viewProducts");
      })
      .catch((err) => {
        console.error("Error updating product:", err);
        alert("❌ Failed to update product");
      });
  };

  return (
    <div className="container mt-4">
      <h3>Update Product</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Product Name</label>
          <input
            type="text"
            name="product_name"
            value={product.product_name || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="destcription"
            value={product.destcription || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Stock Unit</label>
          <select
            name="stock_unit"
            value={product.stock_unit || ""}
            onChange={handleChange}
            className="form-select"
          >
            <option value="" disabled>Select unit</option>
            <option value="kg">Kg</option>
            <option value="pices">Pieces</option>
            <option value="liter">Liter</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={product.discount || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Organic</label>
          <select
            name="organic"
            value={product.organic || 0}
            onChange={handleChange}
            className="form-select"
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        {/* ✅ Subcategory Dropdown */}
        <div className="mb-3">
          <label>Subcategory</label>
          <select
            className="form-select"
            name="subcategory_id"
            value={product.subcategory_id || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Select Subcategory --
            </option>
            {subcategories.length > 0 ? (
              subcategories.map((cat) => (
                <option key={cat.subcategory_id} value={cat.subcategory_id}>
                  {cat.subcategory_name}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>
        </div>

        <div className="mb-3">
          <label>Product Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="form-control"
          />
          {product.product_image && !imageFile && (
            <img
              src={`http://localhost:3000${product.product_image}`}
              alt="Current"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}
        </div>

        <button type="submit" className="btn btn-success me-2">
          Update
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/products")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
