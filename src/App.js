// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import AddClient from "./components/AddClient";
import EditClient from "./components/EditClient";
import Client from "./components/Client";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* 👇 Only authenticated users can access the dashboard */}
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/add-client" element={<AddClient />} />
              <Route
                path="/dashboard/edit-client/:id"
                element={<EditClient />}
              />
              <Route path="/dashboard/client/:id" element={<Client />} />
            </Route>
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
