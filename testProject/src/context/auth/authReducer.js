import { REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
     }  from "../types";

     // eslint-disable-next-line
export default (state,action)=>{
    switch(action.type){ 
        case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
            // console.log(action.payload.token)
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload, //it is token we can do the other way also
                isAuthenticated: true,
            }
        
        case REGISTER_FAIL:
        case LOGIN_FAIL:    
        case AUTH_ERROR: 
        case LOGOUT:
            // localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false, 
                user:null,
                error : action.payload
            }
        case USER_LOADED : 
            return {
                ...state,
                isAuthenticated: true,
                loading : false,
                user: action.payload
            }
        default:
            return state;    
    }
}
