const Logout = () => {
  return (
    <button
      className="cursor-pointer text-red-600"
      onClick={() => {
        window.localStorage.clear();
        window.location.reload();
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
