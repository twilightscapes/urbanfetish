import React from 'react'
// import { navigate } from 'gatsby-link'
// import { FaEnvelope } from 'react-icons/fa'


const Contact = class extends React.Component {
  render() {
    return (
      <div className="wrapper" style={{padding:'0 10%', maxWidth:'900px', margin:'0 auto' }}>
      <form
        className="contact-form specialfont2"
        action="/thanks"
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p>
          <label>
            <input type="text" name="name" placeholder="Name" required />
          </label>
        </p>
        <p>
          <label>
            <input type="email" name="email" placeholder="your@email.com" required />
          </label>
        </p>
        <p>
          <label>
            <input type="text" name="subject" placeholder="Subject" required />
          </label>
        </p>
        <p>
          <label>
            <textarea name="message" placeholder="Your Message" required></textarea>
          </label>
        </p>


   
<div style={{display:'flex', justifyContent:'space-around', alignItems:'center',}}>

                  <label htmlFor="attachment1" style={{padding: '0', color: 'inherit', textShadow:'1px 1px 0 #555', display:'flex', width:'100%', fontSize:'90%', gap:'15px', justifyContent:'center', alignItems:'center'}}>
                  
                  <input
                      className="file-input hidden"
                      type="file"
                      id="attachment1"
                      name="attachment1"
                      // onChange={this.handleAttachment}
                    />
                    ZIP files preferred
                    </label>

          <button
            className="button specialfont1"
            type="submit"
            style={{width:'50%'}}
          >
            Send Message{" "}
          </button>
          </div>
      </form>
    </div>
    )
  }
}

export default Contact




  
      
