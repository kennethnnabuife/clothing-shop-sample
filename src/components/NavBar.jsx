import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";

const NavBar = () => {
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector((state) => state.cart.cartTotalQuantity);
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="nav-bar">
      <Link to="/">
        <div className="logo">SABI SHOP</div>
      </Link>
      <Link to="/cart">
        <div className="cart-bag">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="30"
            fill="currentColor"
            className="bi bi-cart-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div className="bag-quantity">
            <div>{cartTotalQuantity}</div>
          </div>
        </div>
      </Link>
      {user? (
        <div
          onClick={() => {
            dispatch(logoutUser());
            toast.warning("Logged out!", { position: "bottom-left" });
          }}
          className="loginlogout">Welcome back!
          {" "}
          <Link to="/login" className="logout">
            Logout
          </Link>
        </div>
      ) : (
        <div className="loginlogout">
          <Link to="/login" className="login">
            Login
          </Link>
          <Link to="/register" className="register">
            Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
