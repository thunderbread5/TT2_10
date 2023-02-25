import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function ClaimItem({ claim }) {
    return (
        <div className="ticket">
            <div>{claim.claimId}</div>
            <div>{claim.expenseDate}</div>
            <div>{claim.amount}</div>
            <div>{claim.purpose}</div>
            <div>{claim.status}</div>
            <div>
                <Link to={`/claim/${claim.claimId}`}>
                    <FaEye />
                </Link>
                <Link to={`/claim/${claim.claimId}`}>
                    <FaEye />
                </Link>
            </div>
        </div>
    );
}

export default ClaimItem;
