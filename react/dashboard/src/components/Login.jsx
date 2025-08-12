import { useCallback, useState } from "react";
import { login } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loginLoading);
  const error = useSelector((state) => state.auth.loginErrorMsg);
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });

  const handleLogin = useCallback(() => {
    if (!info.username || !info.password) return;
    dispatch(login(info));
  }, [dispatch, info]);

  return (
    <div>
      <h1>Login</h1>
      {error && <p className="text-red-600 font-bold">{error}</p>}
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setInfo({ ...info, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setInfo({ ...info, password: e.target.value })}
      />
      {loading ? (
        <p className="text-red-600 font-bold">Loading...</p>
      ) : (
        <button onClick={handleLogin}>login</button>
      )}
    </div>
  );
};

export default Login;
