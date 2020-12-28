import  React,{useState,useEffect} from 'react'
import Axios from "axios";
const BulkUpload = () => {
    const [files,setFiles] = useState([]);
    const fileChange = (e)=>{ 
        setFiles([...files,...e.target.files])
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
            const res = await Axios.post("/bulkupload/",form,{
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
    useEffect(()=>{
        console.log(files);
    },[files])
    return (
        <div>
            <h1>Bulk Upload Files</h1>
            <div>
            <form onSubmit={fileUpload}>
                        <input type="file" id="file" multiple onChange={fileChange}/>
                        <button type="submit">Submit</button>
                    </form>
            </div>
        </div>
    )
}
export default BulkUpload;