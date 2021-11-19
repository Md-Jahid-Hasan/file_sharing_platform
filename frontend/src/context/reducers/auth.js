const auth = (state, action) => {
    switch(action.type){
        case "LOGIN_SUCCESS":
            localStorage.setItem('token', action.payload.access)
            return {...state, name:action.payload.name, email:action.payload.email,
                is_admin: action.payload.is_staff, is_authenticated:true}
        case "LOG_OUT":
            localStorage.removeItem('token')
            return {...state, name:"", email:"", is_authenticated:false}
        case "USER_LOADED":
            return {...state, name:action.payload.name, email:action.payload.email,
                is_admin: action.payload.is_staff, is_authenticated:true}

        default:
            return state
    }
}

export default auth