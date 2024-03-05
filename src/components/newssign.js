
import * as React from "react"
import { useState } from "react"
import { Link } from "gatsby"
import useSiteMetadata from "../hooks/SiteMetadata";


export function NewsletterPage() {

  const { showModals, language } = useSiteMetadata();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const encode = data => {
    // console.log(data);
    return Object.keys(data)
      .map(key => {
        if (key === "file") {
          return encodeURIComponent(key) + "=" + encodeURIComponent(data[key][0].name);
        }
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
      })
      .join("&");
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (key === "file") {
        data[key] = [value];
      } else {
        data[key] = value;
      }
    });


      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": form.getAttribute("signup"),
          ...data,
        }),
      })
        .then(() => setSubmitted(true))
        .catch(error => alert(error));
    
  };

const { dicPrivacy, dicSignUpText, dicSignUpButton } = language;

return (





<div className="signup" >
<form
  className={`contact-form flexcheek1 ${submitted ? "submitted" : ""}`}
  // action="/install2"
  name="signup"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  encType="multipart/form-data"
  onSubmit={handleSubmit}
  style={{width:'100%', minWidth:'300px', maxWidth:'400px', margin:'0 auto 0 auto', display:'flex', flexDirection:'column', justifyContent:'center', background: 'var(--theme-ui-colors-headerColor)',
  backdropFilter: 'blur(44px)', borderRadius:'var(--theme-ui-colors-borderRadius)', textAlign:'center', alignSelf:'center', overflow:'hidden', color:'var(--theme-ui-colors-headerColorText)', border:'0px solid red'}}
>


<div className="txtshadow" style={{fontSize:'95%', marginTop:'.5rem'}}>{dicSignUpText} 

             <div className="signbox" style={{display:'flex', flexDirection:'column',gap:'10px',}}>

  {submitted ? (
    <div className="thank-you-message" style={{fontSize:'200%', height:'', textAlign:'center'}}>
      Submitted!
    </div>
  ) : (
    <>
      <input type="hidden" name="form-name" value="signup" />


    {/* <p>
      <label htmlFor="name" aria-label="Your Name">
        <input type="text" id="name" name="name" placeholder="Your name" required />
      </label>
    </p> */}
  

      
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label style={{ color: '#fff' }} htmlFor="email">
  <input
    name="email"
    type="email"
    id="email"
    required={true}
    placeholder="your@email.com"
    autoComplete="email"
  />
</label>
      


    {/* <p>
      <label htmlFor="phone" aria-label="Your Phone">
        <input type="tel" id="phone" name="phone" placeholder="Your phone number" />
      </label>
    </p> */}
      {/* <p>
        <label htmlFor="message" aria-label="Your Message">
          <textarea id="message" name="message" placeholder="Your Bio" required></textarea>
        </label>
      </p> */}
   {/* <label htmlFor="file"  aria-label="Upload your file" style={{padding: '0', color: 'inherit', textShadow:'1px 1px 0 #555', display:'flex', flexDirection:'column', width:'100%', fontSize:'90%', gap:'15px', justifyContent:'center', alignItems:'center'}}>
  Upload file
        <input className="file-input hidden" type="file" id="file" name="file" />
      </label> */}


       
       {/* <button
              className="button fire"
              type="submit"
              style={{marginTop:'-8px', whiteSpace:'nowrap', color:''
            }}
            >
              {dicSignUpButton}&nbsp;
              <span className="icon -right">
                <RiSendPlane2Line />
              </span>
            </button> */}

            

        <button
            className="button"
            type="submit"
            disabled={isSubmitting}
            style={{ margin:'-8px auto', whiteSpace:'nowrap', width:'80%',
            border: '1px solid var(--theme-ui-colors-siteColor)',
            background: 'var(--theme-ui-colors-headerColor)', borderRadius: 'var(--theme-ui-colors-borderRadius)', color: 'var(--theme-ui-colors-headerColorText)',

            
          }}
          >
            {isSubmitting ? "Submitting..." : dicSignUpButton}
          </button>
          

          

          <div style={{padding: '', margin:'0 0 5px 0', textAlign: 'center', color:'', fontSize:'70%'}}>
            <Link state={showModals ? { modal: true } : {}} to="/privacy/" className="" style={{textAlign: 'center', padding: '',  textDecoration: 'underline', border:'0px solid yellow'}}>{dicPrivacy}</Link>
            </div>
            
    </>
  )}
  </div>
  </div>
</form>

</div>

)
  
}

export default NewsletterPage;

