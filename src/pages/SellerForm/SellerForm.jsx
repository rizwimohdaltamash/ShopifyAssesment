import React, { useState } from "react";
import { fireDB } from "../../firebase/FirebaseConfig"; // Replace with your Firebase config file path
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const SellerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    address: "",
    category: "",
  });
  const navigate = useNavigate();

  const states = ["Rajasthan", "Gujarat", "Maharashtra", "Delhi"]; // Add your states
  const categories = ["Electronics", "Furniture", "Clothing", "Books"]; // Add your categories
  const cities = {
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Delhi: ["New Delhi"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }
    try {
      await addDoc(collection(fireDB, "sellers"), formData);
      toast.success("Form Submitted Successfully!");
      navigate("/");
      setFormData({
        name: "",
        phone: "",
        city: "",
        state: "",
        address: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to submit data!");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center ">
        <div className=" w-[85%] lg:w-[50%] flex flex-col mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Seller Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            {/* <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div> */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d{0,10}$/.test(value)) {
                    // Allows only up to 10 digits
                    setFormData((prev) => ({
                      ...prev,
                      phone: value,
                    }));
                  } else {
                    toast.error("Phone number must be exactly 10 digits.");
                  }
                }}
                required
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select City</option>
                {(cities[formData.state] || []).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="
              w-[50%] 
    lg:w-[30%] 
    p-2 
    bg-red-500 
    hover:bg-red-400 
    text-white 
    rounded-xl 
    md:rounded-lg 
    lg:rounded-lg 
    active:scale-95 
    focus:ring-2 
    focus:ring-red-300 
    transition-transform 
    duration-200 
    ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SellerForm;
