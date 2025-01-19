import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export default function AddProductScreen() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    countInStock: "",
    rating: "",
    numReviews: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", product);
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(
        `Failed to add product: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow p-4" style={{ maxWidth: '600px' }}>
        <h1 className="card-title text-center mb-4">Add New Product</h1>
        <form onSubmit={handleSubmit}>
          {Object.entries(product).map(([key, value]) => (
            <div key={key} className="mb-3">
              <label htmlFor={key} className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {key !== "description" ? (
                <input
                  type={key === "price" || key === "countInStock" || key === "rating" || key === "numReviews" ? "number" : "text"}
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="form-control"
                  {...(key === "rating" && { min: "0", max: "5", step: "0.1" })}
                />
              ) : (
                <textarea
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="form-control"
                  style={{ height: '100px' }}
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
