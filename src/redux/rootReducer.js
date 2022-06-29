const initState = {
    users: [],
    loading: true,
    searched: [],
    favourite: "",
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
        case 'favourite':
            return {
                ...state,
                favourite: [...state.favourite, ...state.users.filter(i=>i.id===action.payload)],
            }
        case 'favouriteDel':
            return {
                ...state,
                favourite: [...state.favourite.filter(i=>i.id!==action.payload)],
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
