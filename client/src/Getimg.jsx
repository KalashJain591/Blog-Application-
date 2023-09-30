import React, { useEffect, useState } from 'react'
// import UploadCheck from './UploadCheck'
import uploadFile from './UploadCheck';
export default function Getimg() {
    const [image, setimage] = useState();
    const [imglink, setImgLink] = useState();
   const handleupload=async ()=>{
        try {
            if (image) {
                const downloadURL = await uploadFile(image, "imgUrl");
                setImgLink(downloadURL);
                console.log('File available at', downloadURL);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return (

        <div>
            <div className='d-flex justify-content-center align-items-center m-5'>
                {/* <label htmlFor='image'>Image : </label>{imagePer > 0 && "uploading" + imagePer + "%"} */}
                <input type='file' accept='/image' id='img' onChange={(e) => setimage(e.target.files[0])} />
                <button onClick={handleupload}>Submit File</button>
            </div>
        </div>
    )
}

