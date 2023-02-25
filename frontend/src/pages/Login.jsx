import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';
import UserContext from "../context/user/UserContext";

function Login() {
    const [formData, setFormData] = useState({
        EmployeeID: "",
        Password: "",
    });

    const { EmployeeID, Password } = formData;

    const navigate = useNavigate();

    const { user, loading, isSuccess, message, login, isError } =
        useContext(UserContext);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        // redirect when login
        if (isSuccess) {
            toast.success(`Welcome - ${user.FirstName}`);
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
            EmployeeID,
            Password,
        };
        login(userData);
    };

    // if (loading) {
    //     return <Spinner />
    // }

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
                            type="number"
                            className="form-control"
                            id="EmployeeID"
                            name="EmployeeID"
                            value={EmployeeID}
                            onChange={onChange}
                            placeholder="Enter Employee ID"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="Password"
                            name="Password"
                            value={Password}
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
