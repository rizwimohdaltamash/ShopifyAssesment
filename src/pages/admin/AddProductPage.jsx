import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { fireDB, storage } from "../../firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { toast } from "react-hot-toast";

const categoryList = [
  { name: "product" },
  { name: "shirt" },
  { name: "jacket" },
  { name: "mobile" },
  { name: "laptop" },
  { name: "shoes" },
];

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: [],
    category: "",
    description: "",
    totalQuantity: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [imageFiles, setImageFiles] = useState([null, null, null, null]);

  const handleImageUpload = async () => {
    try {
      const uploadedUrls = await Promise.all(
        imageFiles.map(async (file) => {
          if (!file) return null;
          const storageRef = ref(storage, `product-images/${file.name}`);
          await uploadBytes(storageRef, file);
          return await getDownloadURL(storageRef);
        })
      );
      return uploadedUrls.filter((url) => url !== null);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload images.");
      return [];
    }
  };

  const addProductFunction = async () => {
    if (
      product.title === "" ||
      product.price === "" ||
      product.category === "" ||
      product.description === "" ||
      product.totalQuantity === ""
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const imageUrls = await handleImageUpload();
      if (imageUrls.length === 0) {
        setLoading(false);
        return;
      }

      const productRef = collection(fireDB, "products");
      await addDoc(productRef, { ...product, productImageUrl: imageUrls });
      toast.success("✅ Product added successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {loading && <Loader />}
      <div className="bg-white shadow-lg border border-green-200 px-8 py-6 rounded-2xl w-[90%] md:w-[60%] lg:w-[35%]">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-emerald-700 mb-1">
            Add New Product
          </h2>
          <p className="text-gray-500 text-sm">
            Enter details below to add your product.
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

        {/* Description */}
        <div className="mb-3">
          <textarea
            name="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            placeholder="Product Description"
            className="bg-green-50 border border-green-200 text-gray-800 px-3 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-400"
          />
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

        {/* Image Upload */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const files = [...imageFiles];
                files[index] = e.target.files[0];
                setImageFiles(files);
              }}
              className="bg-green-50 border border-green-200 text-gray-800 px-2 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-emerald-400"
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

        {/* Button */}
        <div className="mt-5">
          <button
            onClick={addProductFunction}
            type="button"
            className="bg-emerald-600 hover:bg-emerald-700 transition-all w-full text-green-600 font-bold py-2 rounded-lg shadow-md"
          >
            + Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
