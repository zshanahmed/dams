
const Logout = () => {
  localStorage.clear("token");

  console.log("Logout successful!");
  window.location.replace("/");

  return;
};

export default Logout;
