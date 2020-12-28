import React from 'react'
import Axios from "axios"

const AddEmployee = (props) => {
    // console.log(props)
    const [data,setData] = React.useState({
        name:"",email:""
    })
    const onChange = (e)=>{
        e.preventDefault();
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await Axios.post("/employee/add",data);
            console.log(res.data);
            props.history.push("/");
        } catch (err) {
            
            alert(err.response.data.message)
            
        }
    }
    React.useEffect(()=>{
        // console.log(data);
    },[data.name])
    return (
        <>
        <h1><center>Please Fill Form</center></h1>
        <div style={{font:"20rem"}} style={{width:"100%",height:"080vh",margin:"0",padding:"0",display:"flex",justifyContent:"center"}}>
          <form style={{width:"100%",display:"block"}}onSubmit={handleSubmit}>
              <div style={{width:"80%",margin:"auto",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
              <div style={{width:"80%",margin:"auto",textAlign:"center "}}>
              <label><strong>Name:</strong></label>
              <input style={{margin:"auto",width:"50%"}} name="name" onChange={onChange} value={data.name}></input>
              </div>
              <div style={{width:"80%",margin:"auto",textAlign:"center "}}>
              <label><strong>Email</strong></label>
              <input style={{margin:"auto",width:"50%"}} name="email" onChange={onChange} value={data.email}></input>
              </div>
              <button type="submit">Submit</button>

              </div>

          </form>
        </div>
        </>
    )
}
export default AddEmployee;
