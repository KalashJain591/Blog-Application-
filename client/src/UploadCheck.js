// import React, { useEffect, useState } from 'react'
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import app from './Firebase';

// const UploadCheck = ({ file }) => {
//     const [image, setimage] = useState(file);
//     const [imagePer, setpercent] = useState(0);
//     const [imgLink,setImgLink]=useState();
//     useEffect(() => {
//         image && uploadFile(image, "imgUrl");
//     }, [image])

//     const uploadFile = (file, filetype) => {
//         const storage = getStorage();
//         const folderName = "images/"
//         const fileName = new Date().getTime() + "imgUrl"
//         const storageRef = ref(storage, 'images/' + file.name);
//         const uploadTask = uploadBytesResumable(storageRef, file);

//         // Listen for state changes, errors, and completion of the upload.
//         uploadTask.on('state_changed',
//             (snapshot) => {
//                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 // console.log('Upload is ' + progress + '% done');
//                 setpercent(progress);
//                 switch (snapshot.state) {
//                     case 'paused':
//                         console.log('Upload is paused');
//                         break;
//                     case 'running':
//                         console.log('Upload is running');
//                         break;
//                 }
//             },
//             (error) => {
//                 // A full list of error codes is available at
//                 // https://firebase.google.com/docs/storage/web/handle-errors
//                 switch (error.code) {
//                     case 'storage/unauthorized':
//                         // User doesn't have permission to access the object
//                         break;
//                     case 'storage/canceled':
//                         // User canceled the upload
//                         break;

//                     // ...

//                     case 'storage/unknown':
//                         // Unknown error occurred, inspect error.serverResponse
//                         break;
//                 }
//             },
//             () => {
//                 // Upload completed successfully, now we can get the download URL
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     setImgLink(downloadURL);
//                     console.log('File available at', downloadURL);
//                 });
//             }
//         );
//     }
//     return imgLink;
//     // return (
//     //     <div className='d-flex justify-content-center align-items-center m-5'>
//     //         <label htmlFor='image'>Image : </label>{imagePer>0&& "uploading"+imagePer+"%"}   
//     //         <input type='file' accept='/image' id='img' onChange={(e) => setimage(e.target.files[0])} />
        

//     //     </div>
//     // )
// }

// export default UploadCheck
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from './Firebase';

const uploadFile = async (file, fileType) => {
  try {
    const storage = getStorage();
    const folderName = "images/";
    const fileName = new Date().getTime() + fileType;
    const storageRef = ref(storage, 'images/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Wait for the upload to complete
    await uploadTask;

    // Get the download URL
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
 
    throw error;
  }
};

export default uploadFile;
