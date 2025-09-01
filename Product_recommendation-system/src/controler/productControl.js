import e from "express";
import * as productmodel from "../model/productModel.js";

export const getSubCategories = (req, res) => {
  productmodel.getSubCategories()
    .then((subcategory) => {  
      // console.log("Sub-categories fetched successfully:", subcategory);
      // res.render("addProduct", { subcategory }); // pass subCategories to EJS
      res.status(200).json({ message: "Sub-categories fetched successfully", data: subcategory });
    })
    .catch((err) => {   
      console.error("Error fetching sub-categories:", err);
      res.status(500).send("Error fetching sub-categories");
    }
    );
};


//addProduct_2
export const addProduct_2 = (req, res) => {
  const {
    product_name,
    subcategory_id,
    brand,
    description,   // ✅ correct name
    stock_unit,
    stock,
    price,
    discount,
    organic
  } = req.body;

  // console.log("addProduct_2 called with data:", req.body);
  // console.log(product_name, subcategory_id, brand, description, stock_unit, stock, price, discount, organic);

  const image = req.file ? "/uploads/" + req.file.filename : null;

  productmodel.addProduct_2(
    product_name,
    image,
    subcategory_id,
    brand,
    description,   // ✅ pass correct variable
    stock_unit,
    stock,
    price,
    discount,
    organic
  )
    .then(result => {
      viewProducts(req, res); // after insertion
    })
    .catch(err => {
      // console.error("Error adding product:", err);
      res.status(500).send("Error adding product");
    });
};






export const viewProducts = (req, res) => {
  productmodel.viewProducts()
    .then((products) => {
      // const prod=
      // console.log(products[0].image_url);
      // console.log(products[0].discount);
      // res.render("viewProduct", { products }); // Pass products to EJS view
      res.status(200).json({ message: "Products fetched successfully", data: products });
    })
    .catch((err) => {
      console.error("Error seeing products:", err);
      res.status(500).json({ message: "Error fetching products", error: err });
    });
};

export const deleteProduct = (req, res) => {
  // const product_id = req.params.id || req.query.did || (req.body && req.body.product_id);
  const product_id = req.query;
  console.log(product_id)
  if (!product_id) {
    return res.status(400).send("Product ID is required");
  }
  productmodel.deleteProduct(product_id)
    .then(result => {
      res.status(200).json({ message: "Products deleted successfully", data: products });
    //  viewProducts(req, res); // Redirect to viewProducts after deletion
     
    })
    .catch(err => {
      res.status(500).send("Error deleting product");
    });
};


// GET: Render Update Form with existing product data
export const updateProduct = (req, res) => {
  const {
    pid,
    name,
    description,
    price,
    image_url,
    category_id,
    discount,
    stock_unit
  } = req.query;
  console.log("updateProduct called with data:", req.query);
  res.render('updateProductForm', {
    product: {
      product_id: pid,
      name,
      description,
      price,
      image_url,
      category_id,
      discount,
      stock_unit
    }
  });
};

// POST: Update the product in DB
export const updateProductPost = (req, res) => {
  console.log("updateProductPost called with data:", req.body);
  const {
    product_id,
    name,
    description,
    price,
    category_id,
    discount,
    stock_unit
  } = req.body;

  // Use existing image URL (hidden input)
  const image = req.body.image_url || (req.file ? '/uploads/' + req.file.filename : null);

  productmodel.updateProductPost(product_id, name, description, price, image, category_id, discount, stock_unit)
    .then(result => {
      // res.redirect("/viewProduct"); // change if your route is different
     viewProducts(req, res); // Redirect to viewProducts after deletion
    })
    .catch(err => {
      console.error("Error updating product:", err);
      res.status(500).send("Error updating product");
    });
};



