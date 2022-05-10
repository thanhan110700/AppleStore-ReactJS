const registerAction = (data) =>{
    return {
        type: 'REGISTER',
        payload:data
    }
}
const loginAction = (data) =>{
    return {
        type: 'LOGIN',
        payload:data
    }
}
const logoutAction = () =>{
    return{
        type:"LOGOUT",
    }
}
export {registerAction,loginAction,logoutAction}