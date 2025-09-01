import React, { useState, useEffect } from "react";
import { addProduct, getSubCategoriesNameId } from "../../services/services";

const AddProduct = () => {
  const [subcategories, setSubcategories] = useState([]); // store subcategories
  const [formData, setFormData] = useState({
    product_name: "",
    product_image: null,
    subcategory_id: "",
    brand: "",
    description: "",
    stock_unit: "",
    stock: "",
    price: "",
    discount: "",
    organic: ""
  });

  // fetch subcategories from API on mount
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await getSubCategoriesNameId();
        console.log("Fetched Subcategories:", res.data);
        setSubcategories(res.data.data || []); // ✅ ensure it's an array
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      }
    };

    fetchSubcategories();
  }, []);

  // handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const res = await addProduct(data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product added successfully!");
      console.log("Server response:", res.data);

      // reset form after submit
      setFormData({
        product_name: "",
        product_image: null,
        subcategory_id: "",
        brand: "",
        description: "",
        stock_unit: "",
        stock: "",
        price: "",
        discount: "",
        organic: ""
      });
    } catch (err) {
      console.error("❌ Upload error:", err.response?.data || err.message);
      alert("❌ Error adding product");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Product Name */}
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Product Image */}
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            name="product_image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        {/* Subcategory Dropdown */}
        <div className="mb-3">
          <label className="form-label">Select Subcategory</label>
          <select
            className="form-select"
            name="subcategory_id"
            value={formData.subcategory_id}
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

        {/* Brand */}
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Stock Unit */}
        <div className="mb-3">
          <label className="form-label">Stock Unit</label>
          <select
            className="form-select"
            name="stock_unit"
            value={formData.stock_unit}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select unit
            </option>
            <option value="kg">Kg</option>
            <option value="pices">Pieces</option>
            <option value="liter">Liter</option>
          </select>
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="1"
            max="999999"
            required
          />
        </div>

        {/* Discount */}
        <div className="mb-3">
          <label className="form-label">Discount (%)</label>
          <input
            type="number"
            className="form-control"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            min="0"
            max="100"
            placeholder="0-100%"
          />
        </div>

        {/* Organic */}
        <div className="mb-3">
          <label className="form-label">Organic (1 for Yes, 0 for No)</label>
          <input
            type="number"
            className="form-control"
            name="organic"
            value={formData.organic}
            onChange={handleChange}
            min="0"
            max="1"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
