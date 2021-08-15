import React, {Fragment, useState} from 'react'
import Alert from './Alert';
import Progress from './Progress';
const axios=require('axios');


const FileUpload = () =>{

    const [file, setFile]=useState('');
    const [fielName, setFileName]=useState('Choose file ...');
    const [uploadedFile, setUploadedFile]=useState({});
    const [message, setMessage]=useState('');
    const [uploadPercentage, setUploadPercentage]=useState(0);

    //set file
    const onChange=e=>{
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    //submit form
    const onSubmit=async e=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('file', file);

        try {
            const res=await axios.post('/upload', formData, {
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                onUploadProgress: processEvent => {
                    setUploadPercentage(parseInt(Math.round((processEvent.loaded * 100)/ processEvent.total)));
                    setTimeout(()=>setUploadPercentage(0), 10000);
                }
            });
            const {fielName, filePath}=res.data;

            setUploadedFile({fielName, filePath});
            setMessage('File uploaded successfully');

        } catch (error) {
            if(error.response.status === 500){
                setMessage('There was problem with server');
            }else{
                setMessage(error.response.data.msg);
            }
        }
    }

     return(
        <Fragment>
            {message? <Alert message={message} />:null}
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <input className="form-control" type="file" name="file" onChange={onChange} />
                    <label>{fielName}</label>
                </div>
                <div className="mb-3">
                    <input className="btn btn-primary" type="submit" value="Upload file" />
                </div>
            </form>
            <Progress percentage={uploadPercentage} />
             
            {
                <div className="mt-5">
                    <p>{uploadedFile.fielName}</p>
                    <img className="img-thumbnail" src={uploadedFile.filePath} />
                </div>
            }
        </Fragment>
    )
     }

export default FileUpload
