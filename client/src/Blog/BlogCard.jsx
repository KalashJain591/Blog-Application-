import React, { useEffect, useState } from 'react'
import './Blog.css'
import { NavLink } from 'react-router-dom';
export default function BlogCard(props) {
  props = props.data;
  // console.log(props);
  const [time, setTime] = useState(1 + "D");
  useEffect(() => {
    const currentDate = new Date();
    const updatedOnDate = new Date(props.updateOn);
    const timeDifference = currentDate - updatedOnDate;
    let daysDiff = timeDifference / (1000 * 60 * 60 * 24);
    if (daysDiff <= 1) {
      daysDiff = Math.floor(daysDiff * 24)
      setTime(daysDiff + " Hrs")
    }
    else
      setTime(Math.floor(daysDiff) + " D");
  }, [])

  // Function to truncate the description to 3-4 lines
  function createNewStringWithWords(text, numWords) {
    if (text == null) {
      text = "No matter where you are in your life's journey, remember that the potential within you knows no bounds. This blog is your daily reminder that every day is a new chance to explore, learn, and grow. Your dreams are not just dreams; they are possibilities waiting to be realized. "

    }
    const wordsArray = text.split(' ');

    if (wordsArray.length <= numWords) {
      // If the original string has equal or fewer words than the desired number,
      // return the original text as it is.
      return text;
    } else {
      // If the original string has more words than the desired number,
      // slice the array to get the specified number of words and join them back to form the new string.
      return wordsArray.slice(0, numWords).join(' ');
    }
  }

  return (
    <div>
      <div className="containeer" >
        <div className="cards">
          <div className="cards-header">
            <img src={props.imgLink} alt="image" />
          </div>
          <div className="cards-body">
            <span className="tag tag-teal mb-2">{props.category}</span>
            <h4>
              {props.title}
            </h4>
            <p>
              {createNewStringWithWords(props.displayText, 25)}.....
            </p>

            <div className='user-info-bottom '>
              <NavLink className='' to={`/singlePost/${props._id}`} ><button className='btn btn-sm btn-dark mb-3 '>Read the post </button></NavLink>
              <div className="user">
               
                <img src="https://img.icons8.com/pastel-glyph/64/person-male--v3.png" alt="Author's Image"  />
                <div className="user-info">
                  <h5>{props.name}</h5>
                  <small>{time} ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
