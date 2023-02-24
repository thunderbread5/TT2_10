import { createContext, useReducer } from "react";
import axios from "axios";
import userReducer from "./UserReducer";

const UserContext = createContext();

const API_URL = "api/users/";

export const UserProvider = ({ children }) => {
    const initialState = {
        user: null,
        isError: false,
        isSuccess: false,
        loading: false,
        message: "",
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
                dispatch({ type: "LOGIN_USER", payload: response.data });
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
                login,
                register,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
