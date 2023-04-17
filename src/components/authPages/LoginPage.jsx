import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../features/authSlice";

const LoginForm = () => {
  const decodedEmail = useSelector((state) => state.auth.email);
  const loginError = useSelector((state) => state.auth.loginError);
  const loginLoading = useSelector((state) => state.auth.loginLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userCheck = {
    email,
    password,
  };

  useEffect(() => {
    if (decodedEmail) {
      navigate("/cart");
    }
  }, [decodedEmail, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userCheck));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      {loginLoading === true ? (
        <div>loading</div>
      ) : loginError ? (
        <div>{loginError}</div>
      ) : (
        <div>Enter your details!</div>
      )}
    </>
  );
};

export default LoginForm;
