import React, { useContext, useRef, useState } from 'react'
import './index.css'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from './App'
import JoditEditor from 'jodit-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import uploadFile from './UploadCheck'



export default function Create() {
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState()
  const [displayText, setDisplayText] = useState('');
  const editor = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imgLink, setImgLink] = useState();
  const [cat, setcat] = useState("Technology"); // cateogary
  // const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const handleupload = async (file) => {
    try {
      if (file) {
        const downloadURL = await uploadFile(file, "imgUrl");
        return downloadURL;
      }
      else throw new Error;
    }
    catch (err) {
      console.log(err);
      alert("Some Error Occured in Uploading File");
      return null;
    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(cat);
    var link;
    if (file) {
      console.log(file);
      console.log(file.type);
      if (file.size > 100000) {
        alert("Image File size should be less than 1 MB");
        return;
      }
      else if (file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image.jpg') {
        alert("File Type should be png, jpeg or jpg");
        return;
      }
      link = await handleupload(file);

    }

    const postData = {
      title: title,
      desc: desc,
      displayText: displayText,
      email: user.email,
      imgLink: link,
      category: cat,
    };


    // axios.post('http://localhost:3001/post/create', postData)
    axios.post('/api/post/create', postData)
      .then(res => {
        console.log(res)
        if (res.data == "Posted Successfully") {
          setShowModal(true);
          // navigate('/');
        }
        else {
          alert("Some Error Occured, Please try again later");
        }
      })
      .catch(err => console.log(err))
  }


  return (
    <div className='row d-flex justify-content-center mt-5'>
      <form className='  col-8 ' onSubmit={handleSubmit}>
        <h1>Create Post</h1>
        <input type="text" className="form-control title my-4" placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)} />
        <JoditEditor
          ref={editor}
          value={desc}
          tabIndex={1}
          onChange={(e) => { setDesc(e); }}
        />
        <input type="text" className="form-control title my-4" placeholder='Enter Display Text' onChange={(e) => setDisplayText(e.target.value)} value={displayText} />

        <select name="Category" id="cars" value={cat} onChange={(e) => setcat(e.target.value)}>
          <option value="Technology">Technology</option>
          <option value="Computer Programming">Programming</option>
          <option value="Spiritual">Spiritual</option>
          <option value="General Knowledge">Knowledge</option>
          <option value="Motivation">Motivation</option>
          <option value="Others">Others</option>
        </select>


        <input type="file" className="form-control-file col-12 my-4" id="exampleFormControlFile1" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" className="btn btn-success col-12 my-2 " >Post</button>

      </form>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static"
        keyboard={false}>

        <Modal.Title className='text-center m-2'>Post Successful !!</Modal.Title>

        <Modal.Body>
          Your post has been successfully created!
        </Modal.Body>
        <Modal.Footer>
          <NavLink to='/'><Button variant="primary">
            Go to Home Page
          </Button></NavLink>
        </Modal.Footer>
      </Modal>







    </div>
  )
}
