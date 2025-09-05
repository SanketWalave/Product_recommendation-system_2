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
  const product_id = req.query.product_id; // from frontend GET ?product_id=123

  console.log("in delete product cont " + product_id);

  if (!product_id) {
    return res.status(400).send("Product ID is required");
  }

  productmodel.deleteProduct(product_id)
    .then(result => {
      res.status(200).json({
        message: "Product deleted successfully",
        data: result   // ✅ return DB result
      });
    })
    .catch(err => {
      console.error("Error deleting product:", err);
      res.status(500).send("Error deleting product");
    });
};



// GET: Render Update Form with existing product data
// export const updateProduct = (req, res) => {
//   const {
//     pid
//   } = req.query;
//   console.log("updateProduct called with data:", req.query);
//   res.render('updateProductForm', {
//     product: {
//       product_id: pid,
//       name,
//       description,
//       price,
//       image_url,
//       category_id,
//       discount,
//       stock_unit
//     }
//   });
// };

// POST: Update the product in DB
export const getProductDetailsById = (req, res) => {
   console.log("Query params:", req.query);
  const product_id = req.query.product_id;
  console.log("in controler to get product by id "+product_id);
  
  productmodel.getProductDetailsById(product_id)
  .then(result => {
      res.status(200).json({
        message: "Product find successfully",
        data: result
      });
    })
    .catch(err => {
      console.error("Error finding product:", err);
      res.status(500).send("Error updating product");
    });
};

export const updateProductPost = (req, res) => {
  const {
    product_id,
    product_name,
    subcategory_id,
    brand,
    destcription,
    stock_unit,
    stock,
    price,
    discount,
    organic
  } = req.body;

  if (!product_id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // ✅ If file uploaded → use new image, else keep undefined
  const product_image = req.file ? "/uploads/" + req.file.filename : undefined;

  productmodel.updateProductPost(
    product_id,
    product_name,
    product_image, // undefined if not uploaded
    subcategory_id,
    brand,
    destcription,
    stock_unit,
    stock,
    price,
    discount,
    organic
  )
    .then(result => {
      res.status(200).json({
        message: "Product updated successfully",
        data: result
      });
    })
    .catch(err => {
      console.error("Error updating product:", err);
      res.status(500).json({ message: "Error updating product", error: err });
    });
};
