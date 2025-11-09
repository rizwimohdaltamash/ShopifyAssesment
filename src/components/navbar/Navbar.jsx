// import { Link, useNavigate } from "react-router-dom";
// import SearchBar from "../searchBar/SearchBar";
// import { useSelector } from "react-redux";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { MdAdminPanelSettings } from "react-icons/md";
// import { CiLogin, CiLogout } from "react-icons/ci";
// import { GoGoal } from "react-icons/go";
// import { RiAdminLine } from "react-icons/ri";
// import { AiOutlineInfoCircle } from "react-icons/ai";
// import { FaHome } from "react-icons/fa";
// import { BsCart2 } from "react-icons/bs";
// import { useDispatch } from "react-redux";
// import { resetCart } from "../../redux/cartSlice"; // Update the path to your slice file
// import CraftoLogo from "../../components/assets/craftologo3.jpg";
// import { useSidebar } from "../../context/SidebarProvider.jsx";

// const Navbar = () => {
//   // Get user from localStorage
//   const storedUser = localStorage.getItem("users");
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   const userPrefix = user ? `${user.uid}_` : ""; ///

//   const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

//   // Navigate function
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("users");
//     localStorage.removeItem(`${userPrefix}cart`);
//     localStorage.removeItem("cart");
//     // Reset the Redux cart store
//     dispatch(resetCart());
//     navigate("/login");
//   };

//   // Cart items from Redux
//   const cartItems = useSelector((state) => state.cart);

//   // Nav list for desktop
//   const navList = (
//     <ul className="flex flex-row justify-evenly text-center items-center lg:space-x-9 text-white font-medium text-md lg:px-5 lg:mx-0 mx-2 w-full">
//       <li className="hover:text-blue-600 text-xs lg:text-lg">
//         <Link to={"/"}>Home</Link>
//       </li>
//       <li className="hover:text-blue-600 text-xs lg:text-lg">
//         <Link to={"/allproduct"}>All Products</Link>
//       </li>
//       {!user ? (
//         <li className="hover:text-blue-600 text-xs lg:text-lg">
//           <Link to={"/signup"}>Signup</Link>
//         </li>
//       ) : null}
//       {!user ? (
//         <li className="hover:text-blue-600 text-xs lg:text-lg">
//           <Link to={"/login"}>Login</Link>
//         </li>
//       ) : null}
//       {user?.role === "user" && (
//         <li className="hover:text-blue-600 text-xs lg:text-lg">
//           <Link to={"/user-dashboard"}> User-Dashboard </Link>
//         </li>
//       )}
//       {user?.role === "admin" && (
//         <>
//           <li className="hover:text-blue-600 text-xs lg:text-lg">
//             <Link to={"/admin-dashboard"}>Admin</Link>
//           </li>
//           <li className="hover:text-blue-600 text-xs lg:text-lg">
//             <Link to={"/sellerdata"}>Seller-Data</Link>
//           </li>
//         </>
//       )}
//       {user && (
//         <li
//           className="bg-blue-900 hover:bg-blue-800 active:bg-blue-700 text-white px-3 py-1 rounded-md cursor-pointer text-xs lg:text-lg font-medium shadow-md transition-transform transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           onClick={logout}
//         >
//           Logout
//         </li>
//       )}
//       <li className="text-xs lg:text-lg">
//         <Link to={"/cart"} className="relative">
//           <BsCart2 size={32} />
//           {cartItems.length > 0 && (
//             <span className="absolute top-0 right-0 transform translate-x-[100%] -translate-y-1/3 bg-orange-900 text-white rounded-full px-2 py-1 text-xs">
//               {cartItems.length}
//             </span>
//           )}
//         </Link>
//       </li>
//     </ul>
//   );

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 via-gray-900 to-blue-900 sticky top-0">
//       <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center py-3 lg:px-3">
//         {/* Left Section */}
//         <div className="left hidden md:flex lg:flex py-3 lg:py-0 lg:w-[15%]">
//           <Link to={"/"}>
//             <div className="flex flex-row justify-center items-center">
//               <h2 className="text-3xl text-white bg-red-400">
//                 <img src={CraftoLogo} alt="logo" />
//               </h2>
//             </div>
//           </Link>
//         </div>

//         <div className="md:hidden lg:hidden flex flex-row w-[100%]">
//           {/* Hamburger Icon for Mobile */}
//           <div className=" ml-4 mt-2">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//               className="text-white"
//             >
//               {isSidebarOpen ? (
//                 <AiOutlineClose size={24} />
//               ) : (
//                 <AiOutlineMenu size={24} />
//               )}
//             </button>
//           </div>
//           {/* SearchBar for Mobile */}
//           <div className=" w-[75%]">
//             <SearchBar />
//           </div>
//           {/* Cart for Mobile */}
//           <div className="text-lg text-white ">
//             <Link to={"/cart"} className="relative">
//               {cartItems.length > 0 && (
//                 <span className="absolute top-2 right-1 transform translate-x-[100%] -translate-y-1/3 bg-orange-900 text-white rounded-full px-1 py-0.5 text-xs">
//                   {cartItems.length}
//                 </span>
//               )}
//               <BsCart2 size={32} />
//             </Link>
//           </div>
//         </div>

//         {/* Nav and Search for Desktop */}
//         <div className="hidden md:flex md:flex-row lg:flex lg:flex-row flex-col md:justify-end lg:justify-end md:items-center lg:items-center lg:w-[85%] w-full">
//           <div className="lg:w-[50%] order-2 lg:order-1">
//             <SearchBar />
//           </div>
//           <div className="order-1 md:order-2 lg:order-2 right flex justify-center mb-2 md:mb-0 lg:mb-0 md:w-[50%] lg:w-[50%] w-full">
//             {navList}
//           </div>
//         </div>

//         {/* Sidebar for Mobile */}

//         <div
//           //    className="bg-gray-100 fixed top-0 left-0 w-56 h-full z-50 shadow-lg md:hidden"
//           className={`bg-gray-100 fixed top-0 left-0 w-56 h-full z-50 shadow-lg md:hidden lg:hidden transform ${
//             isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } transition-transform duration-300 ease-in-out`}
//         >
//           <div className="flex flex-col gap-8 p-6 mt-6 relative">
//             <div className="absolute top-0 left-48">
//               <AiOutlineClose
//                 size={24}
//                 onClick={() => setIsSidebarOpen(false)}
//               />
//             </div>

//             <Link
//               to="/"
//               className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500"
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <FaHome /> Home
//             </Link>

//             <Link
//               to="/allproduct"
//               className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500"
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <AiOutlineInfoCircle /> All Products
//             </Link>

//             {user?.role === "user" && (
//               <>
//                 <Link
//                   to="/user-dashboard"
//                   className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500"
//                   onClick={() => setIsSidebarOpen(false)}
//                 >
//                   <RiAdminLine /> User-Dashboard
//                 </Link>
//               </>
//             )}

//             {!user ? (
//               <Link
//                 to="/login"
//                 className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500"
//                 onClick={() => setIsSidebarOpen(false)}
//               >
//                 <CiLogin /> Login
//               </Link>
//             ) : null}
//             {!user ? (
//               <Link
//                 to="/signup"
//                 className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500"
//                 onClick={() => setIsSidebarOpen(false)}
//               >
//                 <GoGoal /> Signup
//               </Link>
//             ) : null}
//             {user?.role === "admin" && (
//               <>
//                 <Link
//                   to="/admin-dashboard"
//                   className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500"
//                   onClick={() => setIsSidebarOpen(false)}
//                 >
//                   <RiAdminLine /> Admin
//                 </Link>
//                 <Link
//                   to="/sellerdata"
//                   className="text-gray-600 flex flex-row items-center gap-2 text-lg hover:text-gray-500"
//                   onClick={() => setIsSidebarOpen(false)}
//                 >
//                   <MdAdminPanelSettings /> Seller-Data
//                 </Link>
//               </>
//             )}
//             {user && (
//               <button
//                 onClick={() => {
//                   logout();
//                   setIsSidebarOpen(false);
//                 }}
//                 className="text-white flex flex-row items-center justify-center gap-2 rounded-md bg-black text-lg hover:bg-gray-800"
//               >
//                 <CiLogout /> Logout
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { CiLogin, CiLogout } from "react-icons/ci";
import { GoGoal } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi"; // Shopify-like cart icon
import { resetCart } from "../../redux/cartSlice";
import { useSidebar } from "../../context/SidebarProvider.jsx";

const Navbar = () => {
  // User data
  const storedUser = localStorage.getItem("users");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userPrefix = user ? `${user.uid}_` : "";

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Logout function
  const logout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem(`${userPrefix}cart`);
    localStorage.removeItem("cart");
    dispatch(resetCart());
    navigate("/login");
  };

  // Redux cart items
  const cartItems = useSelector((state) => state.cart);

  // Desktop Nav Links
  const navList = (
    <ul className="flex flex-row justify-evenly text-center items-center lg:space-x-9 text-green-50 font-medium text-md lg:px-5 lg:mx-0 mx-2 w-full">
      <li className="hover:text-emerald-300 text-xs lg:text-lg">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="hover:text-emerald-300 text-xs lg:text-lg">
        <Link to={"/allproduct"}>All Products</Link>
      </li>
      {!user && (
        <>
          <li className="hover:text-emerald-300 text-xs lg:text-lg">
            <Link to={"/signup"}>Signup</Link>
          </li>
          <li className="hover:text-emerald-300 text-xs lg:text-lg">
            <Link to={"/login"}>Login</Link>
          </li>
        </>
      )}
      {user?.role === "user" && (
        <li className="hover:text-emerald-300 text-xs lg:text-lg">
          <Link to={"/user-dashboard"}>User Dashboard</Link>
        </li>
      )}
      {user?.role === "admin" && (
        <>
          <li className="hover:text-emerald-300 text-xs lg:text-lg">
            <Link to={"/admin-dashboard"}>Admin</Link>
          </li>
          <li className="hover:text-emerald-300 text-xs lg:text-lg">
            <Link to={"/sellerdata"}>Seller Data</Link>
          </li>
        </>
      )}
      {user && (
        <li
          onClick={logout}
          className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded-md cursor-pointer text-xs lg:text-lg font-medium shadow-md transition-transform transform hover:scale-105"
        >
          Logout
        </li>
      )}
      <li className="text-xs lg:text-lg relative">
        <Link to={"/cart"}>
          <BsCart2 size={30} className="text-white hover:text-emerald-300" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-emerald-700 text-white rounded-full px-2 py-0.5 text-xs">
              {cartItems.length}
            </span>
          )}
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-700 sticky top-0 shadow-md z-50">
      <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center py-3 lg:px-3">
        {/* Logo Section */}
        <div className="left hidden md:flex lg:flex py-3 lg:py-0 lg:w-[15%]">
          <Link to={"/"}>
            <div className="flex flex-row justify-center items-center gap-2">
              <FiShoppingCart className="text-white text-4xl" />
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Shopify
              </h2>
            </div>
          </Link>
        </div>

        {/* Mobile Navbar Top Row */}
        <div className="md:hidden lg:hidden flex flex-row w-[100%] items-center justify-between px-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white"
          >
            {isSidebarOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>

          <div className="flex items-center gap-2">
            <FiShoppingCart className="text-white text-3xl" />
            <h2 className="text-2xl font-bold text-white">
              Shop<span className="text-emerald-300">Leaf</span>
            </h2>
          </div>

          <Link to={"/cart"} className="relative text-white">
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-emerald-700 text-white rounded-full px-1 py-0.5 text-xs">
                {cartItems.length}
              </span>
            )}
            <BsCart2 size={28} />
          </Link>
        </div>

        {/* Desktop Nav + Search */}
        <div className="hidden md:flex md:flex-row lg:flex lg:flex-row flex-col md:justify-end lg:justify-end md:items-center lg:items-center lg:w-[85%] w-full">
          <div className="lg:w-[50%] order-2 lg:order-1">
            <SearchBar />
          </div>
          <div className="order-1 md:order-2 lg:order-2 flex justify-center mb-2 md:mb-0 lg:mb-0 md:w-[50%] lg:w-[50%] w-full">
            {navList}
          </div>
        </div>

        {/* Sidebar (Mobile) */}
        <div
          className={`bg-green-50 fixed top-0 left-0 w-56 h-full z-50 shadow-lg md:hidden lg:hidden transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col gap-8 p-6 mt-6 relative text-green-900 font-medium">
            <div className="absolute top-0 left-48">
              <AiOutlineClose
                size={24}
                onClick={() => setIsSidebarOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <Link
              to="/"
              className="flex items-center gap-2 text-lg hover:text-emerald-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaHome /> Home
            </Link>

            <Link
              to="/allproduct"
              className="flex items-center gap-2 text-lg hover:text-emerald-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <AiOutlineInfoCircle /> All Products
            </Link>

            {user?.role === "user" && (
              <Link
                to="/user-dashboard"
                className="flex items-center gap-2 text-lg hover:text-emerald-600"
                onClick={() => setIsSidebarOpen(false)}
              >
                <RiAdminLine /> User Dashboard
              </Link>
            )}

            {!user && (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-lg hover:text-emerald-600"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <CiLogin /> Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 text-lg hover:text-emerald-600"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <GoGoal /> Signup
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <>
                <Link
                  to="/admin-dashboard"
                  className="flex items-center gap-2 text-lg hover:text-emerald-600"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <RiAdminLine /> Admin
                </Link>
                <Link
                  to="/sellerdata"
                  className="flex items-center gap-2 text-lg hover:text-emerald-600"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdAdminPanelSettings /> Seller Data
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsSidebarOpen(false);
                }}
                className="flex items-center justify-center gap-2 bg-green-800 text-white rounded-md py-2 hover:bg-green-700 transition"
              >
                <CiLogout /> Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
