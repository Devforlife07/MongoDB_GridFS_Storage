import React,{useEffect,useState} from 'react'
import Axios from "axios";
import {saveAs} from "file-saver";
 const EmployeeDetails = (props) => {
     let id = props.match.params.id;
     const [files,setFiles] = useState([]);
     const fileChange = async(e)=>{
         console.log(e.target.files)
        //  setFiles(e.target.files[0])
        setFiles([...e.target.files])
        console.log(files);
     }
    const [data,setData] = useState({
    });
    useEffect(()=>{
        let fn = async()=>{
            try{
                let res = await Axios.get(`/employee/${id}`);
                setData({employee:res.data.employee,files:res.data.files});

            }
            catch(e){
                console.log(e.response)
                alert(e.response.data.message)
            }
        }
        fn();
        },[])
        useEffect(()=>{
            let fn = async()=>{
                try{
                    let res = await Axios.get(`/employee/${id}`);
                    setData({employee:res.data.employee,files:res.data.files});
    
                }
                catch(e){
                    console.log(e.response)
                    alert(e.response.data.message)
                }
            }
            fn();
            },[])
    




    const handleSubmit=async(e,id)=>{
        console.log(e.target)
      e.preventDefault();
      try {
          const res = await Axios.get("/file/"+id,{
              responseType:"blob"
          })
          const b = new Blob([res.data],{type:res.headers.type})
          saveAs(b);
        // new File(res.data, "filename.json", {type: res.data.type});
        // saveAs(b)
          console.log(res.data)  
      } catch (e) {
          console.log(e)
          alert(e.message||e.response.data.message)
      }
    }
    const deleteFile = async(e,id)=>{
        e.preventDefault("/")
        try {
            let res = await Axios.delete("/employee/"+id);
            console.log(res.data);
            alert(res.data.message);
            window.location.reload();
            
        } catch (e) {
            console.log(e);
            alert(e.message||e.response.data.message);
        }
    }
    const fileUpload = async(e)=>{
        e.preventDefault();
        try {
           if(files.length==0){
                alert("No File Was Added");
                return;
           }
            const form = new FormData();
            // form.append("employee",files);
            for (let i = 0; i < files.length; i++) {
                form.append(`images[${i}]`, files[i])
            }
            const res = await Axios.post("/file/"+id,form,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            console.log(res);
        } catch (e) {
            console.log(e.response.data);
            alert(e.response.data.message||e.message);
            
        }

    }
    return (
        <div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <h1 style={{textAlign:"center"}}>Employee Info</h1>
            <div style={{}}>
                <h2>Name:{data.employee && data.employee.name}</h2>
                <h2>Email:{data.employee && data.employee.email}</h2>
                <h2>Id:{data.employee && data.employee._id}</h2>
            </div>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%"}}>
             <h1>Upload Files</h1>   
            <form onSubmit={fileUpload}>
                        <input type="file" id="file" multiple onChange={fileChange}/>
                        <button type="submit">Submit</button>
                    </form>
            </div>
            <div style={{width:"100%"}}>
                <table style={{width:"100%"}}>
                    <tr>
                        <th>SNo.</th>
                        <th>Filesize</th>
                        <th>Content Type</th>
                        <th>Upload Date</th>
                        <th>Actions</th>
                    </tr>
                {data.files && data.files.map((file,index) => (
                    <tr  >
                        <td style={{cursor:"pointer"}} type={file["contentType"]} id={file._id} onClick={e=>handleSubmit(e,file._id)}>{(index+1)}</td>
                        <td>{(((file.length)/1024)/1024).toFixed(2)} MB</td>
                        <td>{file["contentType"]}</td>
                        <td>{new Date(file.uploadDate).toDateString()}</td>
                        <td style={{width:"100%"}} className="btn" onClick={e=> deleteFile(e,file._id)}>Delete</td>

                    </tr>
                ))}

                </table>
            </div>
        </div>
    )
}
export default EmployeeDetails;
