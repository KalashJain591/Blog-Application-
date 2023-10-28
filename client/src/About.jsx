import React from 'react';
import developer from "./Images/developer.png"
const About = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <h1>About Our Blog</h1>
          <p style={{ fontSize: "1.25rem" }}>Welcome to our blog website! We're excited to be your go-to destination for a diverse array of articles and resources that span an extensive range of topics. At our core, we're dedicated to delivering valuable insights and assisting our readers in various ways. Explore our Website to uncover an array of expert guides, instructive how-tos, thought-provoking analyses, and much more. We've designed our content to cater to a broad audience, so there's something here for everyone. We're deeply committed to helping you stay informed, make well-informed decisions, and improve various aspects of your life.</p>
        </div>

      </div>
      <div className="row mt-4 align-items-center">
        <div className="col-lg-6">
          <h2>About the Developer</h2>
          <p style={{ fontSize: "1.25rem" }}>As a website developer, I am a passionate tech enthusiast with a strong commitment to working on projects. My mission is to deliver quality content that inspires, educates, and entertains.

            I'm deeply dedicated to the world of technology and strive to provide top-notch material that resonates with my audience. When you connect with me on social media, you'll stay updated with the latest blog posts and website updates. Expect a continuous stream of engaging content as I'm here to assist you with your tech-related queries and insights.</p>
        </div>
        <div className="col-lg-6 text-center">
          {/* <img src="developer.jpg" alt="Developer Image" className="img-fluid rounded-circle mt-3" /> */}
          <img width="400" src={developer} className="img-fluid rounded-circle mt-3 " />
        </div>
      </div>
      <div className="col-lg-6">
        <h2>Connect with Me</h2>
        <ul style={{ fontSize: "1.25rem" }}>
          <li className='m-1'>Follow us on <a href="https://github.com/KalashJain591" target="_blank" rel="noopener noreferrer">Github</a></li>
          <li className='m-1'>Connect on <a href="https://www.linkedin.com/in/kalash-jain-b50027203/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
         
        </ul>
      </div>
    </div>
  );
};

export default About;
