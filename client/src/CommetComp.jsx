import React, { useContext, useState } from 'react'
import './Comments.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { userContext } from './App';

const CommetComp = (props) => {
  const { user } = useContext(userContext);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(props.Desc);
 console.log(props);
  props = props.data;
  let flag = 0;
  // console.log(user.email);
  // console.log(props.author);

  if (user.email == props.author)
    flag = 1;
  console.log("flag :" +flag);

  const { id } = useParams();
  const Delete = () => {
    
    console.log(props.author);
    axios.put(`/api/post/deleteComment/${id}`, { cid: props._id,email: props.author })
      .then(res => {console.log(res);window.location.reload(false);})
      .catch(err => console.log(err))
  }

  const Update = () => {
    console.log(update);
    axios.put(`/api/post/EditComment/${id}`, { cid: props._id, comment: update })
      .then(res => {console.log(res);window.location.reload(false);})
      .catch(err => console.log(err))
  }
  return (
    <div>
      <div className="comment">
        <div className="comment-author">{props.PostedBy}</div>
        <div className="comment-date">{props.PostedOn}</div>
        <div className="comment-description">{props.Desc}</div>
        {/* <div className="comment-upvotes">
        <span role="img" aria-label="Upvote">👍</span> 25
      </div> */}

        {
          flag==1? <><button>
            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash" onClick={Delete} /></button> <button>
              <img width="20" height="20" src="https://img.icons8.com/ios/50/edit--v1.png" alt="edit--v1" onClick={() => {
                setUpdate(props.Desc);
                setEdit(true);
              }} /></button>
            {
              edit ?
                <div>
                  <input type="text" id="commentInput" name="commentInput"
                    value={update} onChange={(e) => { setUpdate(e.target.value) }} />
                  <button className='me-auto' onClick={Update} >Update</button>
                </div> : <></>
            }


          </> : <></>
        }

      </div>
    </div>
  )
}

export default CommetComp;
