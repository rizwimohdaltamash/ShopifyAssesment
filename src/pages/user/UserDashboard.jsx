// import { useContext } from "react";
// import Layout from "../../components/layout/Layout";
// import myContext from "../../context/myContext";
// import Loader from "../../components/loader/Loader";
// import { CgProfile } from "react-icons/cg";

// const UserDashboard = () => {
//   // user
//   const user = JSON.parse(localStorage.getItem("users"));

//   const context = useContext(myContext);
//   const { loading, getAllOrder } = context;
//   // console.log(getAllOrder)

//   // console.log(user)
//   return (
//     <Layout>
//       <div className=" container mx-auto px-4 py-5 lg:py-8">
//         {/* Top  */}
//         <div className="top">
//           {/* main  */}
//           <div className=" bg-gray-900 text-white py-5 rounded-xl border border-gray-600 flex flex-col justify-center items-center">
//             {/* image  */}
//             <div className="flex justify-center">
//               <CgProfile size={92} />
//             </div>
//             {/* text  */}
//             <div className="  w-full flex flex-col justify-center items-center">
//               {/* Name  */}
//               <h1 className="  text-lg">
//                 <span className="text-orange-800 font-bold">Name : </span>
//                 {user?.name}
//               </h1>

//               {/* Email  */}
//               <h1 className="  text-lg">
//                 <span className="text-orange-800 font-bold">Email : </span>
//                 {user?.email}
//               </h1>

//               {/* Date  */}
//               <h1 className="  text-lg">
//                 <span className="text-orange-800 font-bold">Date : </span>
//                 {user?.date}
//               </h1>

//               {/* Role  */}
//               <h1 className="  text-lg">
//                 <span className="text-orange-800 font-bold">Role : </span>
//                 {user?.role}
//               </h1>
//             </div>
//           </div>
//         </div>

//         {/* bottom  */}
//         <div className="bottom">
//           {/* main 1 */}
//           <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
//             {/* text  */}
//             <h2 className=" text-2xl lg:text-3xl font-bold text-center">
//               Order Details
//             </h2>

//             <div className="flex justify-center relative top-10">
//               {loading && <Loader />}
//             </div>

//             {/* main 2 */}
//             {getAllOrder
//               .filter((obj) => obj.userid === user?.uid)
//               .map((order, index) => {
//                 // console.log(order);
//                 return (
//                   <div key={index}>
//                     {order.cartItems.map((item, index) => {
//                       // console.log('item', item);
//                       const {
//                         id,
//                         date,
//                         quantity,
//                         price,
//                         title,
//                         productImageUrl,
//                         category,
//                       } = item;
//                       // console.log('order', order)
//                       const { status } = order;
//                       return (
//                         <div
//                           key={index}
//                           className="mt-5 flex flex-col overflow-hidden rounded-xl border border-gray-300 md:flex-row"
//                         >
//                           {/* main 3  */}
//                           <div className="w-full border-r border-gray-200 text-white bg-gray-900 md:max-w-xs">
//                             {/* left  */}
//                             <div className="p-8">
//                               <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
//                                 <div className="mb-4">
//                                   <div className="text-sm font-semibold text-orange-900">
//                                     Order Id
//                                   </div>
//                                   <div className="text-sm font-medium break-words lg:px-0 px-1">
//                                     #{id}
//                                   </div>
//                                 </div>

//                                 <div className="mb-4">
//                                   <div className="text-sm font-semibold text-orange-900">
//                                     Date
//                                   </div>
//                                   <div className="text-sm font-medium ">
//                                     {date}
//                                   </div>
//                                 </div>

//                                 <div className="mb-4">
//                                   <div className="text-sm font-semibold text-orange-900">
//                                     Total Amount
//                                   </div>
//                                   <div className="text-sm font-medium ">
//                                     ₹ {price * quantity}
//                                   </div>
//                                 </div>

//                                 <div className="mb-4">
//                                   <div className="text-sm font-semibold text-orange-900">
//                                     Order Status
//                                   </div>

//                                   <div
//                                     className={`text-lg font-bold first-letter:uppercase ${
//                                         status === "Processing" 
//                                         ? "text-gray-700" 
//                                         : status === "Out for Delivery" 
//                                         ? "text-yellow-700" 
//                                         : status === "Delivered" 
//                                         ? "text-green-700" 
//                                         : status === "Cancelled" 
//                                         ? "text-red-700" 
//                                         : "text-gray-600" // Default case
//                                     }`}
//                                   >
//                                     {status}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                           {/* right  */}
//                           <div className="flex-1">
//                             <div className="p-8">
//                               <ul className="-my-7 divide-y divide-gray-200">
//                                 <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
//                                   <div className="flex flex-1 items-stretch">
//                                     <div className="flex-shrink-0">
//                                       <img
//                                         className="h-40 w-40 rounded-lg border border-gray-200 object-contain"
//                                         src={productImageUrl}
//                                         alt="img"
//                                       />
//                                     </div>

//                                     <div className="ml-5 flex flex-col justify-between">
//                                       <div className="flex-1">
//                                         <p className="text-sm font-bold text-gray-900">
//                                           {title}
//                                         </p>
//                                         <p className="mt-1.5 text-sm font-medium text-gray-500">
//                                           {category}
//                                         </p>
//                                       </div>

//                                       <p className="mt-4 text-sm font-medium text-gray-500">
//                                         x {quantity}
//                                       </p>
//                                     </div>
//                                   </div>

//                                   <div className="ml-auto flex flex-col items-end justify-between">
//                                     <p className="text-right text-sm font-bold text-gray-900">
//                                       ₹ {price}
//                                     </p>
//                                   </div>
//                                 </li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 );
//               })}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default UserDashboard;

import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { CgProfile } from "react-icons/cg";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { loading, getAllOrder } = context;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-10">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white py-6 rounded-2xl border border-green-800 shadow-lg hover:shadow-green-700/30 transition-all duration-300">
          <div className="flex flex-col justify-center items-center space-y-3">
            <CgProfile size={92} className="text-green-400" />
            <h1 className="text-2xl font-bold tracking-wide text-green-300">User Profile</h1>

            <div className="text-center space-y-2">
              <p className="text-lg">
                <span className="text-green-400 font-semibold">Name:</span> {user?.name}
              </p>
              <p className="text-lg">
                <span className="text-green-400 font-semibold">Email:</span> {user?.email}
              </p>
              <p className="text-lg">
                <span className="text-green-400 font-semibold">Date:</span> {user?.date}
              </p>
              <p className="text-lg">
                <span className="text-green-400 font-semibold">Role:</span> {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Your Orders</h2>
          {loading && (
            <div className="flex justify-center mb-6">
              <Loader />
            </div>
          )}

          {getAllOrder
            .filter((obj) => obj.userid === user?.uid)
            .map((order, i) => (
              <div key={i} className="mb-8">
                {order.cartItems.map((item, j) => {
                  const { id, date, quantity, price, title, productImageUrl, category } = item;
                  const { status } = order;

                  return (
                    <div
                      key={j}
                      className="flex flex-col md:flex-row overflow-hidden rounded-xl border border-green-800 shadow-md bg-gray-950 hover:shadow-green-600/40 transition duration-300"
                    >
                      {/* Left Info */}
                      <div className="w-full md:max-w-xs bg-gray-900 border-r border-green-700 p-6 text-white">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-green-400">Order ID</p>
                            <p className="text-sm font-medium break-words">#{id}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-green-400">Date</p>
                            <p className="text-sm font-medium">{date}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-green-400">Total</p>
                            <p className="text-sm font-medium">₹ {price * quantity}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-green-400">Status</p>
                            <p
                              className={`text-lg font-bold first-letter:uppercase ${
                                status === "Processing"
                                  ? "text-yellow-400"
                                  : status === "Out for Delivery"
                                  ? "text-orange-400"
                                  : status === "Delivered"
                                  ? "text-green-400"
                                  : status === "Cancelled"
                                  ? "text-red-400"
                                  : "text-gray-400"
                              }`}
                            >
                              {status}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Info */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                          <div className="flex items-center space-x-5">
                            <img
                              src={productImageUrl}
                              alt={title}
                              className="h-32 w-32 rounded-lg border border-green-700 object-contain"
                            />
                            <div>
                              <h3 className="text-lg font-bold text-green-300">{title}</h3>
                              <p className="text-sm text-gray-400">{category}</p>
                              <p className="text-sm text-gray-400 mt-2">Qty: {quantity}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-green-400">₹ {price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
