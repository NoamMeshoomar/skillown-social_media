const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'CURRENT_USER':
            return state = action.payload;
        case 'CHANGE_IMAGE':
            return state = { ...state, image: action.payload };
        default:
            return state;      
    }
}

export default userReducer;