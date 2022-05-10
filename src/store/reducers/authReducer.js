import axios from "axios";
const initialState = {
  loginSuccess: false
}

const authReducer = (state = initialState, action) =>{
  
    switch(action.type){
        case "REGISTER":{
            const newUser = action.payload
            console.log(newUser.username)
            
            axios.post('http://localhost:5000/register/', {
                username: newUser.username,
                password: newUser.password,
                fullname: newUser.fullname,
                gender: newUser.gender,
                birthday: newUser.birthday,
                email: newUser.email,
                phonenumber: newUser.phonenumber,
                address: newUser.address
              })
              .then(function (response) {
                console.log(response);
                
              })
              .catch(function (error) {
                console.log(error);
              });
          return {...state}
        }
        case "LOGIN":{
          const data = action.payload
          let loginSuccess = state.loginSuccess
          axios.post('http://localhost:5000/login', {
            username: data.username,
            password: data.password
          })
          .then(function (response) {
                        loginSuccess = true
                        sessionStorage.setItem("token",response.data.token)
                        sessionStorage.setItem("userData",JSON.stringify(response.data.userdata))
                    })
          .catch(function (error) {
            console.log(error.message);
          });
          return {...state,loginSuccess}
        }
        case "LOGOUT":{
          let loginSuccess = false 
          sessionStorage.removeItem("token")
          sessionStorage.removeItem("userData")
          console.log("first")
          return {...state,loginSuccess}
        }
        
        
        default:
            return state
    }
}

export default authReducer