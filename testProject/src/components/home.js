import Axios from 'axios';
import React,{useEffect,useContext,useState} from 'react'
import authContext from "../context/auth/authContext";
// import Table from "./table";




const Home = (props) => {
    
     const {isAuthenticated,loadUser}=useContext(authContext) 
     const [employees,setEmployees] = useState([]);
    //  console.log();
     useEffect(()=>{
         if(!localStorage.getItem("token")){
             props.history.push("/");
         }
     },[])
     useEffect(()=>{
         if(!isAuthenticated){
             if(!localStorage.getItem("token")){
                 props.history.push("/login");
             }
             loadUser();
         }
     },[])
    //  Fetch Employees
     useEffect(()=>{
        let fn = async()=>{
        const res = await Axios.get("/employee");
        setEmployees([res.data.allEmployees]);
        }
        fn();
     },[])
     
     useEffect(()=>{
        let fn = async()=>{
        const res = await Axios.get("/employee");
        setEmployees([res.data.allEmployees]);
        }
        // fn();
     },[employees])
    
     const Table = () => {
        // console.log(employees[0]);
        return (<>
            
         <table style={{width:"100%"}}>
             <thead>
             <tr>
                 <th>id</th>
                 <th>name</th>
                 <th>email</th>
             </tr>
             </thead>
             <tbody>
             {employees[0].map(item=>(
               <tr>
                   <td style={{cursor:'pointer'}} onClick={()=>props.history.push("/"+item._id)}>{item._id}</td>
                   <td>{item.name}</td>
                   <td>{item.email}</td>
               </tr>
    
             ))}
    
             </tbody>
         </table>  </>
        )
    }
    return (<>
    <h1><center>Employee Page</center></h1>
    <div style={{width:"100%"}}>
    <button  style={{display:"block",padding:"0.1rem",margin:"auto",textAlign:"center"}} classname="btn"onClick={()=>props.history.push("/addEmployee")}>Add Employees</button>
    <button  style={{display:"block",padding:"0.1rem",margin:"auto",textAlign:"center"}} classname="btn"onClick={()=>props.history.push("/bulkupload")}>Bulk Upload</button>
    </div>
        <div>{
           employees.length>0 && <Table/>
            }
        </div>
        </>
    )
}
export default Home
