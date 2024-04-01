import React, { useEffect, useState } from "react";
import Catalogue from "./pages/Catalogue/Catalogue";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import Payments from "./pages/Payments/Payments";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import UserArea from "./pages/UserArea/UserArea";
import AsideTickets from "./layout/AsideTickets/AsideTickets";

import LoginForm from "./pages/Authentication/Login/LoginForm";
import RegisterForm from "./pages/Authentication/Register/RegisterForm";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

import AdminControlPanel from "./pages/Admins/AdminControlPanel/AdminControlPanel";
import HeaderAdmin from "./layout/Header/HeaderAdmin";
import UserManagement from "./pages/Admins/UserManagement/UserManagement";
import DesignManagement from "./pages/Admins/DesignManagement/DesignManagement";

import ButtonComponent from "./pages/Buttons/ButtonComponent";
import DivComponent from "./pages/Div/DivComponent";
import FigureComponent from "./pages/Figures/FigureComponent";
import FooterComponent from "./pages/Footers/FooterComponent";
import FormComponent from "./pages/Forms/FormComponent";
import NavComponent from "./pages/Navs/NavComponent";
import SectionComponent from "./pages/Sections/SectionComponent";

import InfoTicketArea from "./layout/InfoTicketArea/InfoTicketArea";
import TicketsManagement from "./pages/Admins/TicketsManagement/TicketsManagement";
import { useAuth } from "./context/AuthContext";
import AdminMiddleware from "./middlewares/AdminMiddleware";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import PremiumMiddleware from "./middlewares/PremiumMiddleware";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import Community from "./pages/Community/Community";


function App() {
  const { isAdmin, isLogged } = useAuth();
  const [logged, setLogged] = useState(isLogged);
  const location = useLocation();
  const [overflowHidden, setOverflowHidden] = useState(false);

  const showAsideTickets = () => {
    return isLogged && location.pathname !== "/user-area";
  };

  return (
    <div className="container-all">
      {isLogged && isAdmin ? (
        <HeaderAdmin
          isLogged={logged}
          setIsLogged={setLogged}
          isAdmin={isAdmin}
        />
      ) : (
        <Header isLogged={logged} setIsLogged={setLogged} />
      )}

      <Routes>
        <Route
          path="/"
          element={<Home isLogged={logged} setIsLogged={setLogged} />}
        />
        <Route
          path="/catalogue"
          element={<Catalogue isLogged={logged} setIsLogged={setLogged} />}
        />
        <Route
          path="/user-area"
          element={
            <AuthMiddleware>
              <UserArea overflowHidden={overflowHidden} setOverflowHidden={setOverflowHidden}/>
            </AuthMiddleware>
          }
        />
        <Route
          path="/payments"
          element={logged ? <Payments /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<LoginForm setIsLogged={setLogged} />} />

        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/admins"
          element={
            <AdminMiddleware>
              <AdminControlPanel />
            </AdminMiddleware>
          }
        />
        <Route
          path="/adminUserManagement"
          element={
            <AdminMiddleware>
              <UserManagement />
            </AdminMiddleware>
          }
        />
        <Route
          path="/adminDesignsManagement"
          element={
            <AdminMiddleware>
              <DesignManagement />
            </AdminMiddleware>
          }
        />
        <Route
          path="/adminticketsManagement/:userId"
          element={
            <AdminMiddleware>
              <TicketsManagement />
            </AdminMiddleware>
          }
        />
        <Route
          path="/community"
          element={
            <PremiumMiddleware>
              <Community />
            </PremiumMiddleware>
          }
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/catalogue/template-buttons/:designId"
          element={
            <ButtonComponent isLogged={logged} setIsLogged={setLogged} overflowHidden={overflowHidden} setOverflowHidden={setOverflowHidden}/>
          }
        />
        <Route
          path="/catalogue/template-divs/:designId"
          element={<DivComponent isLogged={logged} setIsLogged={setLogged}overflowHidden={overflowHidden} setOverflowHidden={setOverflowHidden} />}
        />
        <Route
          path="/catalogue/template-figures/:designId"
          element={
            <FigureComponent isLogged={logged} setIsLogged={setLogged} overflowHidden={overflowHidden} setOverflowHidden={setOverflowHidden}/>
          }
        />
        <Route
          path="/catalogue/template-footers/:designId"
          element={
            <FooterComponent isLogged={logged} setIsLogged={setLogged} overflowHidden={overflowHidden} setOverflowHidden={setOverflowHidden}/>
          }
        />
        <Route
          path="/catalogue/template-forms/:designId"
          element={<FormComponent isLogged={logged} setIsLogged={setLogged} overflowHidden={overflowHidden} setOverflowHidden={setOverflowHidden}/>}
        />
        <Route
          path="/catalogue/template-navs/:designId"
          element={<NavComponent isLogged={logged} setIsLogged={setLogged} overflowHidden={overflowHidden} setOverflowHidden={setOverflowHidden}/>}
        />
        <Route
          path="/catalogue/template-sections/:designId"
          element={
            <SectionComponent isLogged={logged} setIsLogged={setLogged} overflowHidden={overflowHidden} setOverflowHidden={setOverflowHidden}/>
          }
        />
      </Routes>
      {showAsideTickets() && (
        <AsideTickets isLogged={logged} setIsLogged={setLogged} />
      )}
      <Footer />
    </div>
  );
}

export default App;
