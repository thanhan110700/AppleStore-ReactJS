const changeColor = (data) =>{
    return {
        type:"CHANGE_COLOR",
        payload:data
    }
}
const changeMemory = (data) =>{
    return {
        type:"CHANGE_MEMORY",
        payload:data
    }
}

export default {changeColor,changeMemory}