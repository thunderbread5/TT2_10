import { createContext, useReducer } from "react";
import axios from "axios";
import userReducer from "./UserReducer";
import loggedInUserAPI from "./loggedInUserAPI";

const UserContext = createContext();

const API_URL = "http://localhost:5000/api/users/";
// const API_URL = "api/users/";

export const UserProvider = ({ children }) => {
    const initialState = {
        user: null,
        isError: false,
        isSuccess: false,
        loading: false,
        message: "",
        claims: [],
    };

    const [state, dispatch] = useReducer(userReducer, initialState);

    const register = async (userData) => {
        setLoading();
        try {
            const response = await axios.post(API_URL, userData);

            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                dispatch({ type: "REGISTER_USER", payload: response.data });
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({ type: "REGISTER_ERROR", payload: message });
        }
    };

    const login = async (userData) => {
        setLoading();
        try {
            const response = await axios.post(API_URL + "login", userData);

            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                sessionStorage.setItem("jwtToken", response.data.token);
                dispatch({ type: "LOGIN_USER", payload: response.data });
                await getClaims();
            }
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({ type: "LOGIN_ERROR", payload: message });
        }
    };

    // Logout user
    const logout = () => localStorage.removeItem("user");

    const getClaims = async () => {
        setLoading();
        const token = sessionStorage.getItem("jwtToken");
        const user = window.localStorage.getItem("user");

        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "EmployeeID": 58001001
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        try {
            const response = await fetch("http://localhost:5000/api/users/claims/getAll", requestOptions)
            const arr = []
            response.json().then(
                (data) => {
                    arr.push(data)
                }
            )
            // console.log(response.data)
            // console.log(response.data.data.claims)
            dispatch({ type: "GET_CLAIMS", payload: arr });
        } catch (error) {
            dispatch({ type: "CLAIMS_ERROR", payload: error.message });
        }
        



        // const heads = {
        //     "x-access-token": token,
        //     "Content-Type": "application/json",
        // };
        // const body = JSON.stringify({
        //     EmployeeID: 123123,
        // });
        // try {
            // var myHeaders = new Headers();
            // myHeaders.append(
            //     "x-access-token",
            //     token
            // );
            // myHeaders.append("Content-Type", "application/json");

            // var raw = JSON.stringify({
            //     EmployeeID: 123123,
            // });

            // var requestOptions = {
            //     method: "GET",
            //     headers: myHeaders,
            //     body: raw,
            //     redirect: "follow",
            // };

            // fetch("http://localhost:5000/api/users/claims", requestOptions)
            //     .then((response) => response.text())
            //     .then((result) => console.log(result))
            //     .catch((error) => console.log("error", error));
            // axios({
            //     method: "get",
            //     url:
            //         API_URL +
            //         "claims",
            //     headers: { "x-access-token": token },
            //     data: {
            //         "EmployeeID": 123123, // This is the body part
            //     },
            // });
            // const response = await axios.get(API_URL + "claims", body, {headers: heads});
        //     const response = await new loggedInUserAPI().get("claims", body, {
        //         headers: heads,
        //     });
        //     dispatch({ type: "GET_CLAIMS", payload: response.data });
        // } catch (error) {
        //     console.log("**********");
        //     console.log(error.message);
        //     dispatch({ type: "CLAIMS_ERROR", payload: error.message });
        // }
    };

    const addClaim = async (claimData) => {
        setLoading();
        try {
            const response = await axios.post(API_URL + "claims", claimData);
            dispatch({ type: "ADD_CLAIM", payload: response.data });
        } catch (error) {
            dispatch({ type: "ADD_CLAIM_ERROR", payload: error.message });
        }
    };

    const setLoading = () => {
        dispatch({ type: "SET_LOADING" });
    };

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                isError: state.isError,
                isSuccess: state.isSuccess,
                message: state.message,
                claims: state.claims,
                login,
                register,
                logout,
                getClaims,
                addClaim,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
