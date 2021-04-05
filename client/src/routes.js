/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
//import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import Maps from "./views/examples/Maps.js";
import Register from "./views/examples/Register.js";
import Login from "./views/examples/Login.js";
import Tables from "./views/examples/Tables.js";
//import Icons from "./views/examples/Icons.js";
import Home from "./webpages/Home.js"
import PledgeFormPage from "./webpages/PldegeFormPage";
import DisasterFormPage from "./webpages/DisasterFormPage";
import DonorHome from "./webpages/DonorHome.js";
//import Logout from "./components/Logout.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-folder-17 text-red",
    component: Home,
    layout: "/admin",
  },
  {
    path: "/index",
    name: "Donor Home",
    invisible: false,
    icon: "ni ni-folder-17 text-red",
    component: DonorHome,
    layout: "/donor",
  },
  {
    path: "/tables",
    name: "Resources",
    icon: "ni ni-bullet-list-67 text-red",
    invisible: true,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/pledge",
    name: "Pledge Pg",
    invisible: false,
    icon: "ni ni-collection text-pink",
    component: PledgeFormPage,
    layout: "/admin",
  },
  {
    path: "/pledge",
    name: "Pledge/Donation",
    invisible: false,
    icon: "ni ni-collection text-pink",
    component: PledgeFormPage,
    layout: "/donor",
  },
  {
    path: "/disaster",
    name: "Disaster",
    invisible: false,
    icon: "ni ni-atom text-cyan",
    component: DisasterFormPage,
    layout: "/admin",
  },
  /*{
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },*/
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    invisible: true,
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    invisible: true,
    component: Profile,
    layout: "/admin",
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    invisible: true,
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    invisible: true,
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
/*  {
    path: "/logout",
    name: "Logout",
    invisible: true,
    icon: "ni ni-circle-08 text-pink",
    component: Logout,
    layout: "/",
  },*/
];
export default routes;
