import { model } from "../../model";
import productData from "./productData.json";

export const addPreData = () => {
    addAdmin();
    addProduct();
};


export const addAdmin = async () => {
    try {
      const matchUser = await model?.User.findOne({
        email: "admin@admin.com",
        userType: "admin",
      });
      if (!matchUser) {
        model?.User.create({ email: "admin@admin.com", password: "123456" });
        console.log("Admin created...!");
      }
    } catch (error) {
      console.log("----error while admin create ----", error);
    }
};

// export const addProduct = async () => {
//       const count = await model?.Product.countDocuments();
//       console.log("-count--", count);

// if (count === 0) {
//   model?.Product.create(productData)
//     .then((res) => {
//       console.log("--res-", res);
//     })
//     .catch((err) => {
//       console.log("-err-", err);
//     });
// }
  
      

  
              
              
              


export const addProduct = async () => {
  try {
    const count = await model?.Product.countDocuments();
    console.log("-count--", count);

    const existingProducts = await model?.Product.find({});
    const existingProductNames = existingProducts.map((product) => product.productName);
    // console.log("existingProductNames:", existingProductNames );

    const missingProducts = productData.filter((product) => !existingProductNames.includes(product.productName));
    // console.log("missingProducts:", missingProducts);

    for (const product of missingProducts) {
      await model?.Product.create(product)
        .then((res) => {
          // console.log("--add product--", res);
        })
        .catch((err) => {
          // console.log("--errorcatch---:", err);
        });
    }
  } catch (error) {
    console.error("--Error--", error);
  }
};