import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const items = useSelector((state) => state.products.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="home">
      <>
        <div className="home-heading">NEW ARRIVALS</div>
        <div className="products">
          {items.map((currentItem) => (
            <div key={currentItem.id} className="product">
              <img src={currentItem.image} alt={currentItem.name} />
              <div className="product-name"> {currentItem.name}</div>
              <div className="details">
                <span>{currentItem.desc}</span>
                <span className="price">${currentItem.price}</span>
              </div>
              <button
                onClick={() => {
                  dispatch(addToCart(currentItem));
                  navigate("/cart");
                }}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Home;
