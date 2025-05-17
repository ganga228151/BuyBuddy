import { Product } from "../models/product.model.js";
import { checkEmpty } from "../utils/checkempty.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js"

export const addProduct = async (req, res) => {

    // destructure body variables
    const { name, description, Qty, price, category } = req.body;

    // check empty fields 
    if (!checkEmpty(name, description, Qty, price, category)) {
        return res.json({
            message: "all fields are required"
        })
    }

    if (!req.file.filename) {
        return res.json({
            message: "file is required"
        })
    }
    // store image to cloudinary
    let imageUrl;
    let publicId;

    try {
        const image = req.file.path; // assuming you're using multer for file upload
        const result = await cloudinary.uploader.upload(image, {
            folder: "images",
        });

        imageUrl = result.secure_url;
        publicId = result.public_id;

        // proceed with saving product using imageUrl and publicId
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return res.status(500).json({
            message: "Image not uploaded to Cloudinary",
            error: error.message || "Unknown error",
        });
    }


    //unlink image from local upload folder
    fs.unlinkSync(req.file.path);

    // store data to mongo 
    let product;
    try {
        product = await Product.create({
            name, description, Qty, price, category, image: {
                url: imageUrl, public_id: publicId
            }
        });
    } catch (error) {
        console.log(error)
        return res.json({
            message: "server error",
            error
        });
    }
    if (!product) {
        return res.json({
            message: "product not created"
        })
    }
    return res.json({
        message: "product added success fully",
        product,

    });
}


export const getProducts = async (req, res) => {
    let products;
    try {
        products = await Product.find();
    } catch (error) {
        return res.json({
            message: "server error",
            error: error
        });
    }
    if (!products) {
        return res.json({
            message: "products are not found"
        });
    }
    return res.json({
        message: "products fetched success fully",
        response: products,

    })
}


// export const updateProduct = async (req, res) => {
//     // destructure body variables
//     const { name, description, Qty, price } = req.body;
//     const { id } = req.params;
//     // check empty fields 
//     if (!checkEmpty(name, description, Qty, price)) {
//         return res.json({
//             message: "all fields are required"
//         })
//     }

//     // if (!req.file) {
//     //     return res.json({
//     //         message: "file is required"
//     //     });
//     // }
//     let product;
//     try {
//         product = await Product.findById(id);
//     } catch (error) {
//         console.log(error)
//         return res.json({
//             message: "server error",
//             error: error
//         });
//     }

//     if (!product) {
//         return res.json({
//             message: "product not found or invalid product id"
//         });
//     }
//     try {
//         await cloudinary.uploader.destroy(product.image.public_id);
//     } catch (error) {
//         console.log(error);
//         return res.json({
//             message: "image not deleted from mcloudinary",
//             error: error
//         })
//     }
//     let result;
//     try {
//         result = await cloudinary.uploader.upload(req.file.path, {
//             folder: "images"
//         });
//     } catch (error) {
//         console.log(error);
//         return res.json({
//             message: "image not uploaded to cloudinary",
//             error: error
//         })
//     }

//     fs.unlinkSync(req.file.path);

//     product.name = name ;
//     product.description = description ;
//     product.Qty = Qty ;
//     product.price = price ;
//     product.image = {
//         url: result.secure_url,
//         public_id: result.public_id
//     }
//     await product.save();
//     return res.json({
//         message: "product updated success fully",
//         response: product
//     });
// }

export const updateProduct = async (req, res) => {
  const { name, description, price, Qty, image } = req.body;
  const { id } = req.params;

  // ✅ Check for required fields
  if (!checkEmpty(name, description, price, Qty)) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  let product;
  try {
    product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found or invalid product ID",
      });
    }
  } catch (error) {
    console.error("Error finding product:", error);
    return res.status(500).json({
      message: "Server error while finding product",
      error,
    });
  }

  // ✅ Delete old image from Cloudinary
  try {
    if (product.image && product.image.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return res.status(500).json({
      message: "Failed to delete old image from Cloudinary",
      error,
    });
  }

  // ✅ Upload new image if provided
  let uploadedImage;
  try {
    uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "images",
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({
      message: "Image not uploaded to Cloudinary",
      error,
    });
  }

  // ✅ Update product fields
  product.name = name;
  product.description = description;
  product.price = price;
  product.Qty = Qty;
  product.image = {
    url: uploadedImage.secure_url,
    public_id: uploadedImage.public_id,
  };

  // ✅ Save updated product
  try {
    const updatedProduct = await product.save();
    return res.status(200).json({
      message: "Product updated successfully",
      response: updatedProduct,
    });
  } catch (error) {
    console.error("Error saving updated product:", error);
    return res.status(500).json({
      message: "Failed to save updated product",
      error,
    });
  }
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    let product;
    try {
        product = await Product.findById(id);
    } catch (error) {
        return res.status(500).json({
            message: " server error",
            error: error.message
        });
    }
    if (!product) {
        return res.status(404).json({
            message: " product not found",
        });
    }

    await cloudinary.uploader.destroy(product.image.public_id);


    let deletedProduct;
    try {
        deletedProduct = await Product.findByIdAndDelete(id);
    } catch (error) {
        return res.json({
            message: "server error",
            error: error.message
        })
    }
    if (!deletedProduct) {
        return res.json({
            message: "product not deleted"
        })
    }
    return res.status(200).json({
        message: "product deleted success fully"
    });
}



export const getProductById = async (req, res) => {
    const { id } = req.params;
    let product;
    try {
        product = await Product.findById({_id:id});
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
    if (!product) {
        return res.json({
            message: "product not found"
        })
    }
    return res.json({
        response: product,
        message:"produt fetched successfully"
    })

}