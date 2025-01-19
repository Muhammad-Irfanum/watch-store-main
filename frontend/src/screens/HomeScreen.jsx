import { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import TitleBanner from "../TitleBanner";
import Hero from "../components/Hero";
import Product from "../components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("http://localhost:5000/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>WristUp</title>
      </Helmet>
      <TitleBanner />
      <Hero />
      <h1 className="text-3xl font-bold my-6">Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="destructive">{error}</MessageBox>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.slug} className="flex justify-center">
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="my-8 p-6 bg-secondary rounded-lg text-secondary-foreground">
        <h2 className="text-2xl font-semibold text-center mb-4">🕰️ Discover Exquisite Watches 🕰️</h2>
        <p className="text-center mb-4">
          🌟 Explore our meticulously curated collection of high-quality
          watches. Each piece is expertly crafted with precision and style to
          elevate your wrist game. Find the perfect watch that not only tells
          time but also suits your lifestyle and makes a bold statement.
        </p>
        <p className="text-center">
          ⌚ Timekeeping has never been this stylish. From timeless classics to
          cutting-edge innovations, our watch collection caters to every watch
          enthusiast's taste. Find the watch that resonates with your
          personality and adds a touch of elegance to every moment.
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;

