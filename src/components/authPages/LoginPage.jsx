import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../features/authSlice";

const LoginForm = () => {
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userCheck = {
    email,
    password,
  };

  useEffect(() => {
    if (loginStatus === "succeeded") {
      navigate("/cart");
    }
  }, [loginStatus, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userCheck));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
      {loginStatus === "loading" ? (
        <div>loading</div>
      ) : loginStatus === "failed" ? (
        <div>Wrong email or password!</div>
      ) : (
        <div>Enter your details!</div>
      )}
    </>
  );
};

export default LoginForm;
