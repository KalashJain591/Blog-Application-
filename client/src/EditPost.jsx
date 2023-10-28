import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import JoditEditor from 'jodit-react';
import uploadFile from './UploadCheck'
import { userContext } from './App';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { async } from '@firebase/util';
import { trackPromise } from 'react-promise-tracker';
const defaultRef = "temp.jpeg";

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [file, setFile] = useState()
    const [img, setImg] = useState()
    const [imgLink, setImgLink] = useState();
    const [displayText, setDisplayText] = useState('');
    const editor = useRef(null);
    const { user } = useContext(userContext);
    const navigate = useNavigate();
    const [cat, setcat] = useState(); 
    const getRef = (url) => {
        var imageUrl = url;
        console.log(url);
        var parts = imageUrl.split("?");
        var imagePath = parts[0];
        imagePath = decodeURIComponent(imagePath);
        var pathComponents = imagePath.split("/");
        return pathComponents[8];
    }

    const DeleteImage = async (fileRef) => {
        const storage = getStorage();
        const desertRef = ref(storage, `images/${fileRef}`);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            console.log("File Deleted")
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log("File not Deleted" +err)
        });
    }

    const handleupload = async (file) => {
        try {
            if (file) {
                if (file.size > 100000) {
                    alert("Image File size should be less than 1 MB");
                    return;
                }
                else if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image.jpg') {
                    alert("File Type should be png, jpeg or jpg");
                    return;
                }
                const downloadURL = await uploadFile(file, "imgUrl");
                console.log(downloadURL);
                // checkImage(img)
                // To delete the old existing image .
                const fileRef = getRef(img);
                console.log(fileRef);
                if (fileRef != defaultRef) await DeleteImage(fileRef);
                return downloadURL;
            }
        }
        catch (err) {
            console.log(err);
            alert("Some Error Occured in File upload");
            return null;
        }
    }

    // This hook is to initially get the current data of the post to be edited
    // console.log(id);
    useEffect(() => {
        // axios.get('http://localhost:3001/post/getPostById/' + id)
        trackPromise(
        axios.get('/api/post/getPostById/' + id)

            .then(res => {
                // console.log(id);
                // console.log(res);
                setTitle(res.data.title);
                setDesc(res.data.desc);
                setImg(res.data.imgLink);
                setDisplayText(res.data.displayText);
                setcat(res.data.category);

            })
            .catch(err => console.log(err))
        );

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(cat);
        const postData = {
            title: title,
            desc: desc,
            displayText: displayText,
            email: user.email,
            imgLink: null,
            category:cat,
        };


        if (file) {
            const link = await handleupload(file);
            if (link == null)
                return;
            console.log(link);
            setImgLink(link);
            postData.imgLink = link
        }


        console.log(postData);
        // axios.put(`http://localhost:3001/post/editPost/${id}`, postData)
        axios.put(`/api/post/editPost/${id}`, postData)

            .then(res => {
                console.log(res)
                if (res.data == "Updated Successfully")
                    navigate("/");
            })
            .catch(err => console.log(err))

    }
    return (
        <div className='row d-flex justify-content-center mt-5'>
            <form className=' col-sm-5 ' onSubmit={handleSubmit}>
                <h1>Edit Your Post</h1>
                <input type="text" className="form-control title mt-2" placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)} value={title} />
                <JoditEditor
                    ref={editor}
                    value={desc}
                    tabIndex={1}
                    onChange={(e) => { setDesc(e);}}

                    // onChange={(e) => { setDesc(e); console.log(desc); }}
                />
                <input type="text" className="form-control title my-4" placeholder='Enter Display Text' onChange={(e) => setDisplayText(e.target.value)} value={displayText} />
                <select name="Category" id="cars" value={cat} onChange={(e) => {setcat(e.target.value);console.log(cat);}}>
                    <option value="Technology">Technology</option>
                    <option value="Computer Programming">Programming</option>
                    <option value="Spiritual">Spiritual</option>
                    <option value="General Knowledge">Knowledge</option>
                    <option value="Motivation">Motivation</option>
                    <option value="Others">Others</option>
                </select>
                <input type="file" className="form-control-file col-12 mt-2" id="exampleFormControlFile1" onChange={(e) => setFile(e.target.files[0])} />
                <button type="submit" className="btn btn-success col-12 my-2 " >Post</button>
            </form>

        </div>
    )
}
