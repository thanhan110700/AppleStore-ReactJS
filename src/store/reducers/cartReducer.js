const initialState = {
    products:[],
    total:0
}

const cartReducer = (state=initialState, actions) =>{

    switch(actions.type){
        case "ADD_CART":
            var newProducts = [...state.products]
            var totalAddCart = 0
            if(!actions.payload.color){
                alert("Bạn chưa chọn Màu")
            }
            else{
                var issetAddCart = newProducts.find(e => e.id_product === actions.payload.id_product 
                    && e.color === actions.payload.color 
                    && e.memory === actions.payload.memory)
                if(issetAddCart){
                    issetAddCart.amount++
                }
                else{
                    newProducts.push(actions.payload)
                }
            }
            
            newProducts.map(d=>{ return totalAddCart += d.price*d.amount})

            return {
                ...state,
                total:totalAddCart,
                products:newProducts
            }
            
        
        case "INPUT_AMOUNT":
            var productsInputAmount = [...state.products]
            var totalInput = 0
            var issetInpuAmount = productsInputAmount.find(e => e.id_product === actions.payload.data.data.id_product 
                && e.color === actions.payload.data.data.color 
                && e.memory === actions.payload.data.data.memory)
            if(issetInpuAmount){
                issetInpuAmount.amount = actions.payload.data.amount
            }

            productsInputAmount.map(d=>{ return totalInput += d.price*d.amount})
           
            return {
                ...state,
                total: totalInput
            }
        case "REMOVE_CART":
            var productsRemove = [...state.products]
            var totalRemove = 0
            var filterRemove = productsRemove.filter((e) => {
            
                if(e.id_product === actions.payload.data.data.id_product
                && e.color === actions.payload.data.data.color
                && e.memory === actions.payload.data.data.memory){
                    return false
                }
                else{
                    return true
                }
            })
            filterRemove.map((d)=>{ return totalRemove += d.price*d.amount})

            return {
                ...state,
                total:totalRemove,
                products:filterRemove
            }
        default: return state
    }

}

export default cartReducer