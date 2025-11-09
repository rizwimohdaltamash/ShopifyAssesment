import React, { useEffect, useState } from "react";
import { fireDB } from "../../firebase/FirebaseConfig"; // Replace with your Firebase config file path
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { useSidebar } from "../../context/SidebarProvider.jsx";

const AdminData = () => {
  const [sellers, setSellers] = useState([]);
  const { isSidebarOpen } = useSidebar();
  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "sellers"));
        const sellerData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSellers(sellerData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  // Delete a seller
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "sellers", id));
      toast.success("Seller deleted successfully!");
      // Remove the deleted seller from state
      setSellers((prevSellers) =>
        prevSellers.filter((seller) => seller.id !== id)
      );
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error("Failed to delete seller!");
    }
  };

  return (
    <Layout>
       <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-500 via-orange-800 to-pink-500 p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Seller Data</h2>
      {/* {!isSidebarOpen && ( */}
      <div className="w-full">
        <div className="overflow-x-auto w-full rounded-xl">
          <table className="w-full overflow-x-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">#</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">State</th>
                <th className="border border-gray-300 p-2">City</th>
                <th className="border border-gray-300 p-2">Address</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, index) => (
                <tr key={seller.id} className="odd:bg-white even:bg-gray-50 text-center">
                  <td className="border border-gray-300 p-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 p-2">{seller.name}</td>
                  <td className="border border-gray-300 p-2">{seller.phone}</td>
                  <td className="border border-gray-300 p-2">{seller.state}</td>
                  <td className="border border-gray-300 p-2">{seller.city}</td>
                  <td className="border border-gray-300 p-2">
                    {seller.address}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {seller.category}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={(e) => {
                        const target = e.currentTarget;
                        target.classList.add("pressed");
                        setTimeout(
                          () => target.classList.remove("pressed"),
                          200
                        ); // Restore normal state
                        handleDelete(seller.id);
                      }}
                      className="bg-red-500 hover:bg-red-400 active:bg-red-600 active:scale-95 text-white px-4 py-1 rounded shadow-md transition-all duration-150 ease-in-out transform hover:shadow-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* )} */}
    </div>
    </Layout>
   
  );
};

export default AdminData;
