import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import UserContext from "../context/user/UserContext";

function Home() {
    const { user } = useContext(UserContext);

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
            <table className="claimTable">
                <tr>
                    <th>Claim ID</th>
                    <th>Expense Date</th>
                    <th>Amount</th>
                    <th>Purpose</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                <tr>
                    <td>2010</td>
                    <td>Date of Claim</td>
                    <td>100.00</td>
                    <td>Dentist</td>
                    <td>Approved</td>
                    <td>
                        <button>View</button>
                        <button>Edit</button>
                    </td>
                </tr>
            </table>
            {/* <Link to="/" className="btn btn-reverse btn-block">
                <FaQuestionCircle /> Option 1
            </Link>
            <Link to="/" className="btn btn-block">
                <FaTicketAlt /> Option 2
            </Link> */}
        </div>
    );
}

export default Home;