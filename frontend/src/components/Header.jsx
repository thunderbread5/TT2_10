import React, { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/user/UserContext";

function Header() {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate("/");
        window.location.reload()
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">DBSClaim</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className="btn" onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt />
                                Login
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/Register">
                                <FaUser />
                                Register
                            </Link>
                        </li> */}
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;
