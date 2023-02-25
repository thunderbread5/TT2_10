import React from "react";
import { Link } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";

function ViewClaim() {
  return (
    <div>
      <h1>
        <FaAlignJustify /> View Claim
      </h1>
      <form className="form" onSubmit={""}>
        <div className="form-group">
          <label htmlFor="firstname">First Name: </label>
          <h4>hello</h4>
          <label htmlFor="lastname">Last Name: </label>
          <label htmlFor="receiptNumber">Receipt Number: </label>
          <input
            type="text"
            placeholder="Enter your receipt number here"
            id="ExpenseDate"
            name="ExpenseDate"
            value={0}
            disabled={""} //for view function
          ></input>
          <label htmlFor="date">Receipt Date: </label>
          <input
            type="date"
            placeholder="dd-mm-yy"
            id="date"
            name="date"
          ></input>
          <label htmlFor="purpose">Purpose of Expenditure: </label>
          <input
            type="text"
            placeholder="Enter your purpose here"
            id="purpose"
            name="purpose"
          ></input>
        </div>
        <button onClick={""} className="btn btn-block">
          Create Claim
        </button>
        <button onClick={""} className="btn btn-block">
          Close
        </button>
      </form>
    </div>
  );
}
//hello
export default ViewClaim;
