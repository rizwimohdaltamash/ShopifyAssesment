// import { useNavigate, useParams } from "react-router";
// import myContext from "../../context/myContext";
// import { useContext, useEffect, useState } from "react";
// import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import toast from "react-hot-toast";
// import Loader from "../../components/loader/Loader";

// const categoryList = [
//   { name: "product" },
//   { name: "shirt" },
//   { name: "jacket" },
//   { name: "mobile" },
//   { name: "laptop" },
//   { name: "shoes" },
// ];

// const UpdateProductPage = () => {
//   const context = useContext(myContext);
//   const { loading, setLoading, getAllProductFunction } = context;

//   // Navigate
//   const navigate = useNavigate();
//   const { id } = useParams();
//   console.log(id);

//   // Product state
//   const [product, setProduct] = useState({
//     title: "",
//     price: "",
//     productImageUrl: [],
//     category: "",
//     description: "",
//     totalQuantity: 0, // Added field
//     quantity: 1,
//     time: Timestamp.now(),
//     date: new Date().toLocaleString("en-US", {
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//     }),
//   });

//   // Get Single Product Function
//   const getSingleProductFunction = async () => {
//     try {
//       const productTemp = await getDoc(doc(fireDB, "products", id));
//       const product = productTemp.data();
//       setProduct({
//         title: product?.title,
//         price: product?.price,
//         productImageUrl: product?.productImageUrl,
//         category: product?.category,
//         description: product?.description,
//         totalQuantity: product?.totalQuantity || 0, // Include `totalQuantity`
//         time: product?.time,
//         date: product?.date,
//       });
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const updateProduct = async () => {
//     setLoading(true);
//     try {
//       // Ensure `quantity` remains `1`
//       const updatedProduct = {
//         ...product,
//         quantity: 1,
//       };

//       await setDoc(doc(fireDB, "products", id), updatedProduct);
//       toast.success("Product updated successfully");
//       getAllProductFunction();
//       setLoading(false);
//       navigate("/admin-dashboard");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getSingleProductFunction();
//   }, []);

//   return (
//     <div>
//       <div className="flex justify-center items-center h-screen">
//         {loading && <Loader />}
//         {/* Login Form */}
//         <div className="login_Form bg-black px-8 py-6 border rounded-xl shadow-md w-[90%] lg:w-[30%]">
//           {/* Top Heading */}
//           <div className="mb-5">
//             <h2 className="text-center text-2xl font-bold text-orange-900 ">
//               Update Product
//             </h2>
//           </div>

//           {/* Input One */}
//           <div className="mb-3">
//             <input
//               type="text"
//               name="title"
//               value={product.title}
//               onChange={(e) => {
//                 setProduct({
//                   ...product,
//                   title: e.target.value,
//                 });
//               }}
//               placeholder="Product Title"
//               className="bg-gray-800 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
//             />
//           </div>

//           {/* Input Two */}
//           <div className="mb-3">
//             <input
//               type="number"
//               name="price"
//               value={product.price}
//               onChange={(e) => {
//                 setProduct({
//                   ...product,
//                   price: e.target.value,
//                 });
//               }}
//               placeholder="Product Price"
//               className="bg-gray-800 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
//             />
//           </div>

//           {/* Input Three */}
//           {/* {[0, 1, 2, 3].map(index => (
//                     <div className="mb-3" key={index}>
//                         <input
//                             type="text"
//                             name="productImageUrl"
//                             value={product.productImageUrl}
//                             onChange={(e) => {
//                                 setProduct({
//                                     ...product,
//                                     productImageUrl: e.target.value,
//                                 });
//                             }}
//                             placeholder="Product Image Url"
//                             className="bg-gray-800 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
//                         />
//                     </div>
//                      ))} */}

//           {/* Input Three */}
//           {[0, 1, 2, 3].map((index) => (
//             <div className="mb-3" key={index}>
//               <input
//                 type="text"
//                 name="productImageUrl"
//                 value={product.productImageUrl[index] || ""} // Ensure it doesn't throw an error if undefined
//                 onChange={(e) => {
//                   const updatedImages = [...product.productImageUrl]; // Copy array
//                   updatedImages[index] = e.target.value; // Update the specific index
//                   setProduct({
//                     ...product,
//                     productImageUrl: updatedImages, // Update state with modified array
//                   });
//                 }}
//                 placeholder={`Product Image Url ${index + 1}`}
//                 className="bg-gray-800 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
//               />
//             </div>
//           ))}

//           {/* Input Four */}
//           <div className="mb-3">
//             <select
//               value={product.category}
//               onChange={(e) => {
//                 setProduct({
//                   ...product,
//                   category: e.target.value,
//                 });
//               }}
//               className="w-full px-1 py-2 bg-gray-800 text-white rounded-md outline-none"
//             >
//               <option disabled>Select Product Category</option>
//               {categoryList.map((value, index) => {
//                 const { name } = value;
//                 return (
//                   <option
//                     className="first-letter:uppercase"
//                     key={index}
//                     value={name}
//                   >
//                     {name}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>

//           {/* Input Five */}
//           <div className="mb-3">
//             <textarea
//               value={product.description}
//               onChange={(e) => {
//                 setProduct({
//                   ...product,
//                   description: e.target.value,
//                 });
//               }}
//               name="description"
//               placeholder="Product Description"
//               rows="5"
//               className="w-full px-2 py-1 bg-gray-800 text-white rounded-md outline-none placeholder-white"
//             ></textarea>
//           </div>

//           {/* Input Six - Total Quantity */}
//           <div className="mb-3">
//             <input
//               type="number"
//               name="totalQuantity"
//               value={product.totalQuantity}
//               onChange={(e) => {
//                 setProduct({
//                   ...product,
//                   totalQuantity: e.target.value,
//                 });
//               }}
//               placeholder="Total Quantity"
//               className="bg-gray-800 text-white px-2 py-2 w-full rounded-md outline-none placeholder-white"
//             />
//           </div>

//           {/* Update Product Button */}
//           <div className="mb-3">
//             <button
//               onClick={updateProduct}
//               type="button"
//               className="bg-orange-900 hover:bg-orange-800 w-full text-white text-center py-2 font-bold rounded-md"
//             >
//               Update Product
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProductPage;

import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
  { name: "product" },
  { name: "shirt" },
  { name: "jacket" },
  { name: "mobile" },
  { name: "laptop" },
  { name: "shoes" },
];

const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: [],
    category: "",
    description: "",
    totalQuantity: 0,
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const getSingleProductFunction = async () => {
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const product = productTemp.data();
      setProduct({
        title: product?.title,
        price: product?.price,
        productImageUrl: product?.productImageUrl || [],
        category: product?.category,
        description: product?.description,
        totalQuantity: product?.totalQuantity || 0,
        time: product?.time,
        date: product?.date,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      const updatedProduct = { ...product, quantity: 1 };
      await setDoc(doc(fireDB, "products", id), updatedProduct);
      toast.success(" Product updated successfully!");
      getAllProductFunction();
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to update product!");
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {loading && <Loader />}

      <div className="bg-white border border-green-200 rounded-2xl shadow-lg px-8 py-6 w-[90%] md:w-[60%] lg:w-[35%]">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-emerald-700 mb-1">
            Update Product
          </h2>
          <p className="text-gray-500 text-sm">
            Modify details and save the updated product.
          </p>
        </div>

        {/* Product Title */}
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            placeholder="Product Title"
            className="bg-green-50 border border-green-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-400"
          />
        </div>

        {/* Product Price */}
        <div className="mb-3">
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            placeholder="Product Price"
            className="bg-green-50 border border-green-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-400"
          />
        </div>

        {/* Product Image URLs */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="text"
              name="productImageUrl"
              value={product.productImageUrl[index] || ""}
              onChange={(e) => {
                const updatedImages = [...product.productImageUrl];
                updatedImages[index] = e.target.value;
                setProduct({ ...product, productImageUrl: updatedImages });
              }}
              placeholder={`Image URL ${index + 1}`}
              className="bg-green-50 border border-green-200 text-gray-800 px-2 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-400"
            />
          ))}
        </div>

        {/* Category */}
        <div className="mb-3">
          <select
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full px-3 py-2 bg-green-50 border border-green-200 text-gray-800 rounded-md outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">Select Category</option>
            {categoryList.map((value, index) => (
              <option key={index} value={value.name} className="capitalize">
                {value.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <textarea
            name="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            placeholder="Product Description"
            rows="4"
            className="bg-green-50 border border-green-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-400"
          ></textarea>
        </div>

        {/* Total Quantity */}
        <div className="mb-3">
          <input
            type="number"
            name="totalQuantity"
            value={product.totalQuantity}
            onChange={(e) =>
              setProduct({ ...product, totalQuantity: e.target.value })
            }
            placeholder="Total Quantity"
            className="bg-green-50 border border-green-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-400"
          />
        </div>

        {/* Update Button */}
        <div className="mt-5">
          <button
            onClick={updateProduct}
            type="button"
            className="bg-emerald-600 hover:bg-emerald-700 transition-all w-full  text-green-600 font-bold py-2 rounded-lg shadow-md"
          >
             Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;
