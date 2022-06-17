const initState = {
    users: [],
    loading: true,
    searched: [],
    screen:"",
    account_name:""
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'getInfo':
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case 'window':
            return {
                ...state,
                screen: action.payload
            }
        case 'search':
            return {
                ...state,
                searched: action.payload,
            }
        case 'accountName':
            return {
                account_name: action.payload,
            }
        default:
            return state;
    }
};

export default rootReducer;
