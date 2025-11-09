// import { useNavigate } from "react-router";
// import myContext from "../../context/myContext";
// import { useContext, useEffect } from "react";
// import Loader from "../loader/Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, deleteFromCart } from "../../redux/cartSlice";
// import toast from "react-hot-toast";

// // import { doc, updateDoc, getDoc } from "firebase/firestore";
// // import { fireDB } from "../../firebase/FirebaseConfig";

// const HomePageProductCard = () => {
//   const storedUser = localStorage.getItem("users");
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   // Use user-specific keys
//   const userPrefix = user ? `${user.uid}_` : "";

//   const navigate = useNavigate();

//   const context = useContext(myContext);
//   const { loading, getAllProduct } = context;

//   const cartItems = useSelector((state) => state.cart);

//   // console.log(cartItems);

//   const dispatch = useDispatch();

//   // const updateTotalQuantity = async (id, operation) => {
//   //     try {
//   //         const productRef = doc(fireDB, "products", id);
//   //         const productSnap = await getDoc(productRef);

//   //         if (productSnap.exists()) {
//   //             const currentQuantity = productSnap.data().totalQuantity;

//   //             // Perform the operation (add or subtract)
//   //             const updatedQuantity = operation === "decrement"
//   //                 ? currentQuantity - 1
//   //                 : currentQuantity + 1;

//   //             // Update the quantity in the database
//   //             await updateDoc(productRef, { totalQuantity: updatedQuantity });
//   //         } else {
//   //             toast.error("Product not found in the database!");
//   //         }
//   //     } catch (error) {
//   //         console.error("Error updating totalQuantity:", error);
//   //         toast.error("Failed to update product quantity!");
//   //     }
//   // };

//   // add to cart function
//   const addCart = (item) => {
//     dispatch(addToCart(item));
//     // updateTotalQuantity(item.id, "decrement"); // Reduce totalQuantity by 1
//     toast.success("Added to cart");
//   };

//   // delete from cart function
//   const deleteCart = (item) => {
//     dispatch(deleteFromCart(item));
//     // updateTotalQuantity(item.id, "increment"); // Increase totalQuantity by 1
//     toast.success("Delete cart");
//   };

//   // useEffect(() => {
//   //     localStorage.setItem(`${userPrefix}cart`, JSON.stringify(cartItems));
//   // }, [cartItems]);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem(`${userPrefix}cart`, JSON.stringify(cartItems));
//     }
//   }, [cartItems, userPrefix, user]);

//   return (
//     <div className="mt-10">
//       {/* Heading  */}
//       <div className="bg-gray-800 text-white">
//         <h1 className=" text-center py-2 mb-5 text-2xl font-semibold">
//           Bestselling Products
//         </h1>
//       </div>

//       {/* main 1 */}
//       <section className="text-gray-600 body-font">
//         {/* main 2 */}
//         <div className="container px-5 py-5 mx-auto">
//           <div className="flex justify-center">{loading && <Loader />}</div>
//           {/* main 3  */}
//           <div className="flex flex-wrap -m-4">
//             {getAllProduct.slice(0, 8).map((item, index) => {
//               const { id, title, price, productImageUrl, totalQuantity } = item;
//               return (
//                 <div key={index} className="p-1 w-2/4 md:w-1/4 lg:w-1/4">
//                   <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer ">
//                     <img
//                       onClick={() => navigate(`/productinfo/${id}`)}
//                       className="h-32 md:h-60 lg:h-60 w-full"
//                       src={productImageUrl}
//                       alt="img"
//                     />
//                     <div className="p-4">
                     
//                       <h1 className="title-font flex text-xl font-bold text-gray-900 mb-3 overflow-y-auto">                         
//                         {title}
//                        </h1>
                      
//                       <div className="flex flex-row gap-x-6 md:gap-x-36 lg:gap-x-36">
//                       <h1 className=" title-font text-md font-semibold text-gray-900 mb-3">
//                         ₹ {price}    
//                       </h1>

//                       <p className="ml-2 text-gray-500">
//                    {totalQuantity < 10 ? `only ${totalQuantity} left` : ""}
//                      </p>
//                       </div>
                     

//                       <div className="flex justify-center ">
//                         {cartItems.some((p) => p.id === item.id) ? (
//                           <button
//                             onClick={() => deleteCart(item)}
//                             className=" bg-orange-900 hover:bg-orange-800 w-full text-white py-[4px] rounded-lg font-bold"
//                           >
//                             Delete From Cart
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => addCart(item)}
//                             className=" bg-orange-900 hover:bg-orange-800 w-full text-white py-[4px] rounded-lg font-bold"
//                           >
//                             Add To cart
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HomePageProductCard;


import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userPrefix = user ? `${user.uid}_` : "";

  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart ✅");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.error("Removed from cart 🛒");
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${userPrefix}cart`, JSON.stringify(cartItems));
    }
  }, [cartItems, userPrefix, user]);

  return (
    <div className="mt-10">
      {/* Heading */}
      <div className="bg-green-700 text-white shadow-md">
        <h1 className="text-center py-3 mb-5 text-2xl font-semibold tracking-wide">
          🌿 Bestselling Products
        </h1>
      </div>

      {/* Products Grid */}
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex justify-center">{loading && <Loader />}</div>
          <div className="flex flex-wrap -m-4">
            {getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl, totalQuantity } = item;
              const isInCart = cartItems.some((p) => p.id === item.id);

              return (
                <div key={index} className="p-2 w-1/2 md:w-1/4 lg:w-1/4">
                  <div className="h-full border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 bg-white">
                    <img
                      onClick={() => navigate(`/productinfo/${id}`)}
                      className="h-48 md:h-64 lg:h-64 w-full object-cover cursor-pointer rounded-t-2xl"
                      src={productImageUrl}
                      alt={title}
                    />

                    <div className="p-4">
                      <h1 className="title-font text-lg font-bold text-gray-900 mb-2 truncate">
                        {title}
                      </h1>

                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-md font-semibold text-green-700">
                          ₹ {price}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {totalQuantity < 10 ? `Only ${totalQuantity} left!` : ""}
                        </p>
                      </div>

                      <div className="flex justify-center">
                        {isInCart ? (
                          <button
                            onClick={() => deleteCart(item)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-semibold transition-all duration-300"
                          >
                            Remove from Cart
                          </button>
                        ) : (
                          <button
                            onClick={() => addCart(item)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition-all duration-300"
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
