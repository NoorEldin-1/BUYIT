import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit } from "../features/authSlice";

const EditAccount = () => {
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.editLoading);
  const error = useSelector((state) => state.auth.editErrorMsg);

  const handleEdit = useCallback(() => {
    if (!info.username || !info.password) return;
    dispatch(edit(info));
  }, [dispatch, info]);

  useEffect(() => {
    setInfo({
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    });
  }, []);

  return (
    <div>
      <h1>Edit Account</h1>
      {error && <p className="text-red-600 font-bold">{error}</p>}
      <input
        type="text"
        placeholder="username"
        value={info.username}
        onChange={(e) => setInfo({ ...info, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
        value={info.password}
        onChange={(e) => setInfo({ ...info, password: e.target.value })}
      />
      {loading ? (
        <p className="text-red-600 font-bold">Loading...</p>
      ) : (
        <button onClick={handleEdit}>edit</button>
      )}
    </div>
  );
};

export default EditAccount;
