import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

function ViewClaim() {
  const [formData, setFormData] = useState({
    employeeId: "",
    password: "",
  });

  const { employeeId, password } = formData;

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     const userData = {
  //       employeeId,
  //       password,
  //     };
  //     login(userData);
  //   };

  function closeButton() {
    console.log("hello");
    window.location.href = "/Home";
  }

  const [isEnabled, setIsEnabled] = useState(true);
  const editClaim = (e) => {
    e.preventDefault();
    setIsEnabled(!isEnabled);
  };

  const [firstname, changeFirstName] = useState('Alex');
  function setFirstName(e) {
    changeFirstName(e.target.value)
  }

  const [lastname, changeLastName] = useState('Teo');
  function setLastName(e) {
    changeLastName(e.target.value)
  }

  const [amount, changeAmount] = useState('100');
  function setAmount(e) {
    changeAmount(e.target.value)
  }

  const [purpose, changePurpose] = useState('Dentist');
  function setPurpose(e) {
    changePurpose(e.target.value)
  }



  return (
    <div>
      <h1>
        <FaAlignJustify /> View Claim
      </h1>
      <form className="form" onSubmit={""}>
        <div className="form-group">
          <label>Claim ID: </label>
          <input
            type="text"
            className="form-control"
            id="claimID"
            name="claimID"
            value={0}
            onChange={""}
            disabled
          />
          <label>Insurance ID: </label>
          <input
            type="text"
            className="form-control"
            id="insuranceID"
            name="insuranceID"
            value={0}
            onChange={""}
            disabled={isEnabled}
          />
          <label>First Name: </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={firstname}
            onChange={setFirstName}
            disabled={isEnabled}
          />
          <label>Last Name: </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={lastname}
            onChange={setLastName}
            disabled={isEnabled}
            required
          />
          <label htmlFor="date">Date: </label>
          <input
            type="text"
            className="form-control"
            id="date"
            name="date"
            value={0}
            onChange={""}
            disabled={isEnabled}
          />
          <label htmlFor="Amount">Amount: </label>
          <input
            type="text"
            className="form-control"
            id="amount"
            name="amount"
            value={amount}
            onChange={setAmount}
            disabled={isEnabled}
          ></input>
          <label>Purpose of Expenditure: </label>
          <input
            type="text"
            className="form-control"
            id="purpose"
            name="purpose"
            value={purpose}
            onChange={setPurpose}
            disabled={isEnabled}
          ></input>
          <label>Follow Up: </label>
          <input
            type="text"
            className="form-control"
            id="followUp"
            name="followUp"
            value={0}
            disabled
          ></input>
          <label htmlFor="PreviousClaimId">Previous Claim ID </label>
          <input
            type="text"
            id="PreviousClaimId"
            name="PreviousClaimId"
            value={0}
            disabled
          ></input>
          <label>Status: </label>
          <input
            type="text"
            className="form-control"
            id="status"
            name="status"
            value={"Approved"}
            disabled
          ></input>
          <label>Last Edited Date: </label>
          <input
            type="text"
            id="lastEditedDate"
            name="lastEditedDate"
            value={"0"}
            disabled
          ></input>
        </div>
        <button onClick={editClaim} className="btn btn-block">
          Edit Claim
        </button>
        <Link to="/Home">
          <button onClick={closeButton} className="btn btn-block">
            Close
          </button>
        </Link>
      </form>
    </div>  
  );
}
//hello
export default ViewClaim;
