const userReducer = (state, action) => {
    switch (action.type) {
        case "REGISTER_USER":
            return {
                ...state,
                user: action.payload,
                loading: false,
                isError: false,
                isSuccess: true,
                message: "",
            };
        case "REGISTER_ERROR":
            return {
                ...state,
                loading: false,
                isSuccess: false,
                isError: true,
                message: action.payload,
            };
        case "LOGIN_USER":
            return {
                ...state,
                user: action.payload,
                loading: false,
                isError: false,
                isSuccess: true,
                message: "",
            };
        case "LOGIN_ERROR":
            return {
                ...state,
                loading: false,
                isSuccess: false,
                isError: true,
                message: action.payload,
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            }
        default:
            return state;
    }
};

export default userReducer;
