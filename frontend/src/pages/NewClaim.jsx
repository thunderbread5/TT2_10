import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import UserContext from "../context/user/UserContext";

function NewClaim() {
    const [formData, setFormData] = useState({
        expenseDate: "",
        amount: "",
        purpose: "",
        followUp: 0,
        prevClaimId: -1,
    });

    const { expenseDate, amount, purpose, followUp, prevClaimId } = formData;

    const navigate = useNavigate();

    const { user, loading, isSuccess, message, login, isError, addClaim } =
        useContext(UserContext);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const claimData = {
            expenseDate,
            amount,
            purpose,
            followUp,
            prevClaimId,
        };
        addClaim(claimData);
    };
    return (
        <div>
            <h1>
                <FaRegPlusSquare /> Create Claim
            </h1>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="FirstName">First Name: </label>
                    <input
                        type="text"
                        placeholder="Enter your First Name here"
                        id="firstname"
                        name="firstname"
                    ></input>
                    <label htmlFor="LastName">Last Name </label>
                    <input
                        type="text"
                        placeholder="Enter your Last Name here"
                        id="lastname"
                        name="lastname"
                    ></input>
                    <label htmlFor="Claimamount">Claim amount </label>
                    <input
                        type="text"
                        placeholder="Enter claim amount here"
                        id="claimamount"
                        name="claimamount"
                    ></input>
                    <label htmlFor="receiptNumber">Receipt Number: </label>
                    <input
                        type="text"
                        placeholder="Enter your receipt number here"
                        id="receiptNumber"
                        name="receiptNumber"
                    ></input>
                    <label htmlFor="expenseDate">Receipt Date: </label>
                    <input
                        type="date"
                        placeholder="dd-mm-yy"
                        id="expenseDate"
                        name="expenseDate"
                        value={expenseDate}
                        onChange={onChange}
                        required
                    ></input>
                    <label htmlFor="purpose">Purpose: </label>
                    <input
                        type="text"
                        placeholder="Enter your purpose here"
                        id="purpose"
                        name="purpose"
                        value={purpose}
                        onChange={onChange}
                        required
                    ></input>
                    {/* <label htmlFor="email">Follow up: </label> */}
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Create Claim</button>
                </div>
            </form>
        </div>
    );
}
//hello
export default NewClaim;
