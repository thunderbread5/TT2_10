import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function ClaimItem({ claim }) {
    return (
        <div className="ticket">
            <div>{claim._id}</div>
            <div>{claim.ExpenseDate}</div>
            <div>{claim.Amount}</div>
            <div>{claim.Purpose}</div>
            <div>{claim.Status}</div>
            <div>
                <Link to={`/claim/${claim._id}`}>
                    <FaEye />
                </Link>
            </div>
        </div>
    );
}

export default ClaimItem;
