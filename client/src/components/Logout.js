
const Logout = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.clear("token");
    history.push("/auth/login");
  };

  return <Button onClick={logout}><i className="ni ni-user-run" />  Logout</Button>;
};

export default Logout;
