import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
        <div className="FooterCont">
            <div className="FooterContentBox">
              <div className="FooterContentItem">
                <ul>
                  <li><h3>COMPANY</h3></li>
                  <li><a href="https://digitalcareerinstitute.org/en/about-us/">About Us</a></li>
                  <li><a href="https://digitalcareerinstitute.org/en/faq/">FAQ</a></li>
                  <li><a href="https://digitalcareerinstitute.org/en/press/">Press</a></li>
                  <li><a href="https://digitalcareerinstitute.org/contact/">Contact</a></li>
                  <li><a href="https://dci-jobs.personio.de/">Jobs at DCI</a></li>
                </ul>
              </div>
              <div className="FooterContentItem">
                <ul>
                  <li><h3>COMMUNITY</h3></li>
                  <li><a href="https://digitalcareerinstitute.org/en/scholarship/">Scholarship</a></li>
                  <li><a href="https://digitalcareerinstitute.org/en/hire/">Hire your digital talents with DCI</a></li>
                  <li><a href="https://digitalcareerinstitute.org/en/stories/">Stories</a></li>
                </ul>
              </div>
              <div className="FooterContentItem">
                <ul>
                  <li><h3>COURSES</h3></li>
                  <li><a href="https://digitalcareerinstitute.org/en/onetoone-coaching/">One to One Coaching</a></li>
                  <li><a href="https://digitalcareerinstitute.org/en/orientiation-course/">Orientation Course</a></li>
                  <li><a href="https://digitalcareerinstitute.org/en/courses/one-year-program/">Web Development Course</a></li>
                  <li><a href="https://digitalcareerinstitute.org/en/courses/digital-marketing-e-commerce/">Digital Marketing / E-Commerce</a></li>
                </ul>
              </div>
              <div className="FooterContentItem">
                <ul>
                  <li><h3>FOLLOW</h3></li>
                  <li><a href="https://www.facebook.com/devugees">Facebook</a></li>
                  <li><a href="https://twitter.com/DevugeesOrg">Twitter</a></li>
                  <li><a href="https://medium.com/devugees">Medium</a></li>
                  <li><a href="https://www.youtube.com/channel/UCSM_3ldxjcclGTcXaJRBYTw">YouTube</a></li>
                </ul>
              </div>
            </div>
        </div>
    );
  }
}

export default Footer;