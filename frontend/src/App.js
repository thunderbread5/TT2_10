import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { UserProvider } from "./context/user/UserContext";
import NewClaim from "./pages/NewClaim";

function App() {

    return (
        <div>
            <UserProvider>
                <Router>
                    <div className="container">
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/newclaim" element={<NewClaim />} />
                        </Routes>
                    </div>
                </Router>
                <ToastContainer />
            </UserProvider>
        </div>
    );
}

export default App;
