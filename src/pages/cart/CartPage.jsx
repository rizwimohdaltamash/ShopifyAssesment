import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from "lucide-react";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection,doc,getDoc,updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
import EmptyCart from "../../components/assets/emptycart.png";

const CartPage = () => {
 
  const user = JSON.parse(localStorage.getItem("users"));
  // const userPrefix = user ? `${user.uid}_` : ""; // User-specific key prefix

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // New update quantity
  // const updateQuantity = async (id, operation) => {
  //       try {
  //           const productRef = doc(fireDB, "products", id);
  //           const productSnap = await getDoc(productRef);
    
  //           if (productSnap.exists()) {
  //               const currentQuantity = productSnap.data().quantity;
    
  //               // Perform the operation (add or subtract)
  //               const updatedQuantity = operation === "decrement" 
  //                   ? currentQuantity - 1 
  //                   : currentQuantity + 1;
    
  //               // Update the quantity in the database
  //               await updateDoc(productRef, { quantity: updatedQuantity });
  //           } else {
  //               toast.error("Product not found in the database!");
  //           }
  //       } catch (error) {
  //           console.error("Error updating totalQuantity:", error);
  //           toast.error("Failed to update product quantity!");
  //       }
  //   };


  // Fetch totalQuantity directly from Firestore for validation
  const fetchTotalQuantity = async (id) => {
    try {
      const productRef = doc(fireDB, "products", id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        return productSnap.data().totalQuantity;
      } else {
        console.error("Product not found in Firestore!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching totalQuantity:", error);
      return null;
    }
  };

  const deleteCart = async(item) => {
    dispatch(deleteFromCart(item));
     // Update quantity to 1 for all cart items
     await Promise.all(
      cartItems.map(async (item) => {
        const productRef = doc(fireDB, "products", item.id);
        await updateDoc(productRef, { quantity: 1 });
      })
    );
    toast.success("Delete cart");
  };

  

  // Increment item quantity
  const handleIncrement = async (id) => {
    const item = cartItems.find((item) => item.id === id);
    const totalQuantity = await fetchTotalQuantity(id);

    if (item && item.quantity < totalQuantity) {
      dispatch(incrementQuantity(id));
     // Update local storage
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      toast.error("Cannot add more than available stock.");
    }
  };
 // Decrement item quantity
  const handleDecrement = async(id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      // Update the product quantity in the database (totalQuantity)
    
    dispatch(decrementQuantity(id));
    // Update local storage
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    }else {
      toast.error("Minimum quantity is 1.");
    }
  };

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const buyNowFunction = async() => {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("All Fields are required");
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "Processing",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    // Load Razorpay script and initiate payment
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = async () => {
      const options = {
        key: "rzp_test_oy0ogDNk4xSPEB",
        key_secret: "e5rj5EgNTLhgxJXDfs2wj7DD",
        amount: parseInt(cartTotal * 100), // Total amount in paise
        currency: "INR",
        name: "Astra-Mart",
        description: "Test Transaction",
        handler:async function (response) {
          toast.success("Order Placed");
          

          // Save order information to Firestore
          try {
          
            await Promise.all(
              cartItems.map(async (item) => {
                const productRef = doc(fireDB, "products", item.id);
                const productSnap = await getDoc(productRef);
        
                if (productSnap.exists()) {
                  const currentTotalQuantity = productSnap.data().totalQuantity;
                  const localCart = JSON.parse(localStorage.getItem("cart")) || [];
                  const localItem = localCart.find((localItem) => localItem.id === item.id);
                  const localQuantity = localItem ? localItem.quantity : 0;
        
                  const updatedQuantity = currentTotalQuantity - localQuantity;
        
                  if (updatedQuantity >= 0) {
                    await updateDoc(productRef, { totalQuantity: updatedQuantity });
                  } else {
                    console.error("Insufficient stock in Firestore.");
                    toast.error("Error updating stock. Please try again.");
                  }
                }
              })
            );

            // Save order information to Firestore
            const paymentId = response.razorpay_payment_id;
            await addDoc(collection(fireDB, "order"), { ...orderInfo, paymentId });

        
            // Clear cart and reset local storage
            cartItems.forEach((item) => dispatch(deleteFromCart(item)));
            localStorage.setItem("cart", JSON.stringify([]));
            // Navigate to homepage page 
            navigate("/");
           
          } catch (error) {
            console.error("Error processing order:", error);
            toast.error("Error placing order.");
          }
        },
        theme: {
          color: "#00008B",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };
    document.body.appendChild(script);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul  className="divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item, index) => {
                      const {
                        id,
                        title,
                        price,
                        productImageUrl,
                        quantity,
                        category,
                      } = item;
                      return (
                        <div key={index} className="">
                          <li className="flex py-6 sm:py-6 ">
                            <div className="flex-shrink-0">
                              <img
                                src={productImageUrl}
                                alt="img"
                                className="h-32 w-32 lg:h-24 lg:w-24 rounded-md object-contain object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                <div >
                                  <div
                                   className="flex justify-between"
                                  >
                                    <h3 className="text-sm">
                                      <div className="font-semibold text-black lg:ml-0 ml-20">
                                        {title}
                                      </div>
                                    </h3>
                                  </div>
                                  <div
                                   className="mt-1 flex text-sm"
                                 
                                   >
                                    <p className="text-sm text-gray-500 lg:ml-0 ml-20">
                                      {category}
                                    </p>
                                  </div>
                                  <div className="mt-1 flex items-end lg:ml-0 ml-20">
                                    <p className="text-sm font-medium text-gray-900">
                                      ₹{price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <div className="mb-2 flex">
                            <div className="min-w-24 flex">
                              <button
                                onClick={() => handleDecrement(id)}
                                type="button"
                                className="h-7 w-7"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="mx-1 h-7 w-9 rounded-md border text-center"
                                value={quantity}
                              />
                              <button
                                onClick={() => handleIncrement(id)}
                                type="button"
                                className="flex h-7 w-7 items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                            <div className="ml-8 lg:ml-6 flex text-sm">
                              <button
                                onClick={() => deleteCart(item)}
                                type="button"
                                className="flex items-center space-x-1 px-2 py-1 pl-0 lg:ml-0 ml-20"
                              >
                                <Trash size={16} className="text-red-500" />
                                <span className="text-lg font-medium text-red-500">
                                  Remove
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div>
                    <div>
                      <h1 className="text-green-700 font-bold text-xl mt-4">
                        Cart Is Empty
                      </h1>
                      <img
                        src={EmptyCart}
                        alt="Empty Cart"
                        className=" w-[250px] h-[250px] ml-12"
                      />
                    </div>
                  </div>
                )}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">
                      Price ({cartItemTotal} item)
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹ {cartTotal}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹ {cartTotal}
                    </dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium ">
                  <div className="flex gap-4 mb-6">
                    {user ? (
                     
                      <div>
                        {cartItems.length > 0 ? (
                          <BuyNowModal
                            addressInfo={addressInfo}
                            setAddressInfo={setAddressInfo}
                            buyNowFunction={buyNowFunction}
                          />
                        ) : (
                          <div
                            onClick={() => toast.error("Add items in cart")}
                            className="bg-green-700 hover:bg-green-500 text-white cursor-pointer px-4 py-2 rounded"
                            role="button" // Adds accessibility
                            tabIndex={0} // Makes it focusable
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              toast.error("Add items in cart")
                            }
                          >
                            Buy Now
                          </div>
                        )}
                      </div>
                    ) : (
                      <Navigate to="/login" />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
