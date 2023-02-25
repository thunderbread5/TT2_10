import React from "react";
import { Link } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";

function NewClaim() {
  return (
    <div>
      <h1>
        <FaRegPlusSquare/> Create Claim
      </h1>
      <form className="form" onSubmit={""}>
        <div className="form-group">
          <label htmlFor="email">First Name: </label>
          <input
            type="text"
            placeholder="Enter your first name here"
            id="FirstName"
            name="FirstName"
          ></input>
          <label htmlFor="password">Last Name: </label>
          <input
            type="text"
            placeholder="Enter your last name here"
            id="LastName"
            name="LastName"
          ></input>
          <label htmlFor="receiptNumber">Receipt Number: </label>
          <input
            type="text"
            placeholder="Enter your receipt number here"
            id="ExpenseDate"
            name="ExpenseDate"
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
          <label htmlFor="email"></label>
            Follow up?
            <input
              value="Yes"
              onChange={""}
              type="radio"
              id="FollowUp"
              name="FollowUp"
            />
            <input
              value="No"
              onChange={""}
              type="radio"
              id="FollowUp"
              name="FollowUp"
            />
        </div>
        <button onClick={""} className="btn btn-block">
          Create Claim
        </button>
      </form>
    </div>
  );
}
//hello
export default NewClaim;
