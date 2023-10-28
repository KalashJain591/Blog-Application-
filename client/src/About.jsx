import React from 'react';
import developer from "./Images/developer.png"
const About = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-10">
          <h1>About Our Blog</h1>
          <p>Welcome to our blog! Here, you'll find a treasure trove of articles and resources covering a wide range of topics, including [list key topics/niches covered on your blog]. Our mission is to provide valuable insights and help our readers [describe the purpose of your blog].</p>
          <p>Explore our blog to discover expert guides, informative how-tos, insightful analyses, and much more. Whether you're a beginner or an expert, there's something here for everyone. We're dedicated to helping you [describe what your blog offers to readers].</p>
        </div>

      </div>
      <div className="row mt-4 align-items-center">
        <div className="col-lg-6">
          <h2>About the Developer</h2>
          <p>[Your Name], the developer of this website, is a passionate [your field/niche] enthusiast. With a strong commitment to [describe your motivation for creating the blog], [Your Name] is dedicated to delivering quality content that inspires, educates, and entertains. Connect with [Your Name] on social media and stay updated on the latest blog posts and updates.</p>
        </div>
        <div className="col-lg-6 text-center">
          {/* <img src="developer.jpg" alt="Developer Image" className="img-fluid rounded-circle mt-3" /> */}
          <img width="400"  src={developer} className="img-fluid rounded-circle mt-3 " />
        </div>
      </div>
      <div className="col-lg-6">
        <h2>Connect with Us</h2>
        <ul>
          <li>Follow us on <a href="https://twitter.com/YourTwitter" target="_blank" rel="noopener noreferrer">Github</a></li>
          <li>Connect on <a href="https://www.linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li>Subscribe to our <a href="your-newsletter-link" target="_blank" rel="noopener noreferrer">Leetcode</a></li>
        </ul>
      </div>
    </div>
  );
};

export default About;
