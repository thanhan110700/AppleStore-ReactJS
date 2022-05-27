const initialState = {
    isChange:0
}

const productReducer = (state = initialState,actions) => {
    switch (actions.type) {
        case "CHANGE_STATUS":
            const isChange = state.isChange
            return {...state,isChange: isChange+1}
        default:
            return {...state}
    }
}

export default productReducer