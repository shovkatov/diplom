const initState = {
    users: [],
    loading: true,
    searched: []
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'getInfo':
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case 'search':
            return {
                ...state,
                searched: action.payload,
            }
        default:
            return state;
    }
};

export default rootReducer;
