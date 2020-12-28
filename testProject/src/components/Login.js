import React,{useState , useContext, useEffect} from 'react';
import AuthContext from "../context/auth/authContext";


const Login = (props) => {

    const [user,setUser] = useState({       
        username : '',
        password : '',
    });

    const {   username, password } = user;
    const authContext = useContext(AuthContext);
    const { login, isAuthenticated  } =  authContext;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    useEffect(() => {
        if (isAuthenticated) {
          props.history.push('/');
        }
      }, [props.history,isAuthenticated]);

    const onSubmit = (e)=>{
        e.preventDefault();
        try{
        
            login({
                username,password
            });
            
        }catch(e){
            alert(e.response.data.message)
            console.log(e);

        }
        
    }




    return (
        <div className="form-container">
            <h1>
                <span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}  >
                
                <div className='form-group'>
                <label htmlFor='username'>Username(Email)</label>
                <input
                    id='username'
                    type='text'
                    name='username'
                    value={username}
                    onChange={onChange}
                    required
                />
                </div>
                <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                />
                </div>
                
                <input
                type='submit'
                value='Login'
                className='btn btn-primary btn-block'
                />
            </form>
    
        </div>
    )
}

export default Login;
