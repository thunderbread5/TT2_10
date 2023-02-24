import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import UserContext from "../context/user/UserContext";
import Spinner from '../components/Spinner';

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const { user, loading, isSuccess, isError, message, register } =
        useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        // redirect when login
        if (isSuccess) {
            toast.success(`Registered new user - ${user.name}`);
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
        if (password !== password2) {
            toast.error("Passwords dont match");
        } else {
            const userData = {
                name,
                email,
                password,
            };
            register(userData);
        }
    };

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Create an account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Enter name"
                            required
                        />
                    </div>
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
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                            placeholder="Confirm password"
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

export default Register;
