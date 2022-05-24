const addCart = (data) =>{
    return {
        type:"ADD_CART",
        payload:data
    }
}

const removeCart = (data) =>{
    return{
        type:"REMOVE_CART",
        payload:{data}
    }
}
const inputAmount = (data) =>{
    return{
        type:"INPUT_AMOUNT",
        payload:{data}
    }
}
export {addCart, removeCart, inputAmount}
