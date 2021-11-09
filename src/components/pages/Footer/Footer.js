import React from 'react';
import './Footer.css';
import { Button } from '../../Button';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';
// import { FaSquareFull } from 'react-icons/fa';
import CitrusLogo from '../../logo/citrusLogo';
import {lang_dict} from './Data.js';

// npm install --save-dev @iconify/react @iconify-icons/fa-brands
import { Icon, InlineIcon } from '@iconify/react';
import canadianMapleLeaf from '@iconify-icons/fa-brands/canadian-maple-leaf';

// import { MdFingerprint } from 'react-icons/md';

function Footer(props) {
  const supported_language = ['EN', 'FR'];
  console.log("FOOTER props ;", props)
  let Subscription_heading = false
  let Footer_subscription_text = false
  let Email_placeholder = false
  let Subscribe_button = false
  let About_us_title = false
  let How_it_works = false
  let Testimonials = false
  let Careers = false
  let Investors = false
  let TermsOfService = false
  let Contact_us_title = false
  let Contact = false
  let Support = false
  let Destinations = false
  let Sponsorships = false
  let Video_title = false
  let Submit_Video = false
  let Ambassadors = false
  let Agency = false
  let Influencer = false
  let Social_media_title = false
  let Instagram = false
  let Facebook = false
  let Youtube = false
  let Twitter = false
  let Business_name = false
  let Copy_rights = false
  let proudCanadianLabel = false

  if (supported_language.includes(props.lang)){
    Subscription_heading = lang_dict[props.lang]['Subscription_heading'];
    Footer_subscription_text = lang_dict[props.lang]['Footer_subscription_text'];
    Email_placeholder = lang_dict[props.lang]['Email_placeholder'];
    Subscribe_button = lang_dict[props.lang]['Subscribe_button'];
    About_us_title = lang_dict[props.lang]['About_us_title'];
    How_it_works = lang_dict[props.lang]['How_it_works'];
    Testimonials = lang_dict[props.lang]['Testimonials'];
    Careers = lang_dict[props.lang]['Careers'];
    Investors = lang_dict[props.lang]['Investors'];
    TermsOfService = lang_dict[props.lang]['TermsOfService'];
    Contact_us_title = lang_dict[props.lang]['Contact_us_title'];
    Contact = lang_dict[props.lang]['Contact'];
    Support = lang_dict[props.lang]['Support'];
    Destinations = lang_dict[props.lang]['Destinations'];
    Sponsorships = lang_dict[props.lang]['Sponsorships'];
    Video_title = lang_dict[props.lang]['Video_title'];
    Submit_Video = lang_dict[props.lang]['Submit_Video'];
    Ambassadors = lang_dict[props.lang]['Ambassadors'];
    Agency = lang_dict[props.lang]['Agency'];
    Influencer = lang_dict[props.lang]['Influencer'];
    Social_media_title = lang_dict[props.lang]['Social_media_title'];
    Instagram = lang_dict[props.lang]['Instagram'];
    Facebook = lang_dict[props.lang]['Facebook'];
    Youtube = lang_dict[props.lang]['Youtube'];
    Twitter = lang_dict[props.lang]['Twitter'];
    Business_name = lang_dict[props.lang]['Business_name'];
    Copy_rights = lang_dict[props.lang]['Copy_rights'];
    proudCanadianLabel = lang_dict[props.lang]['proudCanadianLabel']
    console.log("EMAIL PLACEHOLDER :",Email_placeholder)
  }

  return (
    <div className='footer-container'>
      {/* <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          {Subscription_heading}
        </p>
        <p className='footer-subscription-text'>
          {Footer_subscription_text}
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder={Email_placeholder}
            />
            <Button buttonStyle='btn--outline'>{Subscribe_button}</Button>
          </form>
        </div>
      </section> */}
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>{About_us_title}</h2>
            <Link to='/HowItWorks'>{How_it_works}</Link>
            <Link to='/FAQ'>{Testimonials}</Link>
            {/* <Link to='/'>{Careers}</Link> */}
            {/* <Link to='/'>{Investors}</Link> */}
            <Link to='/ToS'>{TermsOfService}</Link>
          </div>
          <div className='footer-link-items'>
            <h2>{Contact_us_title}</h2>
            <Link to='/AboutUs'>{Contact}</Link>
            <Link to='/AboutUs'>{Support}</Link>
            {/* <Link to='/'>{Destinations}</Link> */}
            {/* <Link to='/'>{Sponsorships}</Link> */}
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>{Video_title}</h2>
            <Link to='/'>{Submit_Video}</Link>
            {/* <Link to='/'>{Ambassadors}</Link> */}
            {/* <Link to='/'>{Agency}</Link> */}
            {/* <Link to='/'>{Influencer}</Link> */}
          </div>
          <div className='footer-link-items'>
            <h2>{Social_media_title}</h2>
            <Link to='/'>{Instagram}</Link>
            <Link to='/'>{Facebook}</Link>
            <Link to='/'>{Youtube}</Link>
            <Link to='/'>{Twitter}</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <CitrusLogo />&nbsp;
              {Business_name}
            </Link>
          </div>

          <div className="col" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'column'}}>
            <div className="row">
              <small className='website-rights'>{Copy_rights}</small>
            </div>
            <div className="row">
              <small className='website-rights'><Icon icon={canadianMapleLeaf} color="red" width={16} />  {proudCanadianLabel} <Icon icon={canadianMapleLeaf} color="red" width={16} />
              </small>
            </div>
          </div>
          
          <div className='social-icons'>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <FaFacebook />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <FaInstagram />
            </Link>
            <Link
              className='social-icon-link'
              to={
                '//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber'
              }
              target='_blank'
              aria-label='Youtube'
            >
              <FaYoutube />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <FaTwitter />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
        
      </section>
      <small className='website-rights'> <a href="http://www.freepik.com">Images designed by upklyak</a> </small>
      
    </div>
  );
}

export default Footer;
