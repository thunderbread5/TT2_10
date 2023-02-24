import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';
import UserContext from "../context/user/UserContext";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const navigate = useNavigate();

    const { user, loading, isSuccess, message, login, isError } =
        useContext(UserContext);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        // redirect when login
        if (isSuccess) {
            toast.success(`Welcome - ${user.name}`);
            navigate("/");
        }
    }, [isSuccess, user, navigate, message]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        };
        login(userData);
    };

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login;
