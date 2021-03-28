
const Logout = () => {
  localStorage.clear();

  console.log("Logout successful!");
  window.location.replace("/");

  return;
};

export default Logout;
