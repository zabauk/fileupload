const express= require('express');
const fileUpload=require('express-fileupload');

const app=express();

app.use(fileUpload());

//File upload
app.post('/upload', function(req, res){
    //check file is null
    if(req.files === null){
        return res.status(400).json({msg: 'No file found'});
    }

    const file=req.files.file;
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    })
})

app.listen(5000, ()=>console.log('Server is running'));