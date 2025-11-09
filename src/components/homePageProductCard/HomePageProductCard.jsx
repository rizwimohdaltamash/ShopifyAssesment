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
