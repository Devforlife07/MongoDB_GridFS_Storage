import React ,{useContext, useState,useEffect} from 'react';
import AuthContext from "../context/auth/authContext";

const Signup = (props) => {

    const [user,setUser] = useState({
        username : '',
        email : '',
        password : ''
    });

    const { username , email, password } = user;

    const authContext = useContext(AuthContext);


    const { register, isAuthenticated  } =  authContext;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    useEffect(() => {
        if (isAuthenticated) {
          props.history.push('/');
        }
      }, [props.history,isAuthenticated]);

    const onSubmit = (e)=>{
        e.preventDefault();
            register({
                username,email,password
            });
    }


    return (
        <div className="form-container">
            <h1>
                <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onSubmit}  >
                <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                    id='username'
                    type='text'
                    name='username' 
                    value={username}
                    onChange={onChange}
                    
                />
                </div>
                <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input
                    id='email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    
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
                    
                    minLength='6'
                />
                </div>
                
                <input
                type='submit'
                value='Register'
                className='btn btn-primary btn-block'
                />
            </form>

        </div>

    )
}

export default Signup;
