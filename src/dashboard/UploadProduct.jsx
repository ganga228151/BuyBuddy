import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../utils/checkToken";

export const UploadProduct = () => {
  const imageRef = useRef();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    Qty: "",
    category: "",   // <-- added category here
    image: null,
    preview: null,
  });

  const handleImageReference = () => {
    imageRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("Qty", formData.Qty);
      data.append("category", formData.category);  // <-- append category
      if (formData.image) {
        data.append("image", formData.image);
      }
      const token = getAuthToken();

      const response = await axios.post(
        "https://buyboddy-backend.onrender.com/api/product/add",
        // "http://localhost:5000/api/product/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload success:", response.data);
      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Upload error:", error.response || error.message);
      alert("Failed to upload product.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center w-1/2 shadow-lg shadow-gray-500 mt-10 text-md font-medium p-5 rounded border mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="p-10 border-2 border-red-400 text-md font-medium w-full my-5 border-dotted flex flex-col items-center justify-center mx-auto">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            name="image"
            ref={imageRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={handleImageReference}
            className="py-2 px-5 bg-blue-400 text-md font-medium rounded mb-4"
          >
            Upload Product Image
          </button>

          {formData.preview && (
            <img
              src={formData.preview}
              alt="Preview"
              className="max-w-xs max-h-48 rounded border"
            />
          )}
        </div>

        <input
          type="text"
          placeholder="Product name"
          className="p-3 rounded border outline-none focus:ring-2 w-full"
          onChange={handleChange}
          name="name"
          value={formData.name}
          required
        />
        <input
          type="text"
          placeholder="Product description"
          className="p-3 rounded border outline-none focus:ring-2 w-full my-4"
          onChange={handleChange}
          name="description"
          value={formData.description}
          required
        />
        <input
          type="text"  // category usually text, can be dropdown if you want
          placeholder="Product category"
          className="p-3 rounded border outline-none focus:ring-2 w-full my-4"
          onChange={handleChange}
          name="category"
          value={formData.category}
          required
        />
        <input
          type="number"
          placeholder="Product price"
          className="p-3 rounded border outline-none focus:ring-2 w-full"
          onChange={handleChange}
          name="price"
          value={formData.price}
          required
        />
        <input
          type="number"
          placeholder="Product Qty"
          className="p-3 rounded border outline-none focus:ring-2 w-full my-4"
          onChange={handleChange}
          name="Qty"
          value={formData.Qty}
          required
        />

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="py-3 px-5 bg-blue-400 text-md font-medium rounded"
          >
            Upload product
          </button>
        </div>
      </form>
    </section>
  );
};
