import React /*, { useEffect }*/ from "react";
import { Redirect } from "react-router-dom";

const isUserAuth = () => {
    var userData = JSON.parse(localStorage.getItem("userInfo"));

    if (!userData) {
        <Redirect to="/auth/login" />
    } else {
        return(true);
    }
};

export default isUserAuth;