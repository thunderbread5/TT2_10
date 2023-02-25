import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaPen } from "react-icons/fa";
import UserContext from "../context/user/UserContext";
import ClaimItem from "../components/ClaimItem";

function Home() {
    const { user, claims } = useContext(UserContext);

    if (!user) {
        return (
            <>
                <section className="heading">
                    <h1>Hello</h1>
                </section>
            </>
        );
    }

    return (
        <div>
            <h1>Claims</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Claim ID</div>
                    <div>Expense Date</div>
                    <div>Amount</div>
                    <div>Purpose</div>
                    <div>Status</div>
                    <div>Actions</div>
                    <div></div>
                </div>
                {claims.map((claim) => (
                    <ClaimItem key={claim.claimId} claim={claim} />
                ))}
            </div>
        </div>
    );
}

export default Home;
