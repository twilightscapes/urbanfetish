
import * as React from "react"
import styled from "styled-components";
// import { Link } from 'gatsby'
// import { CgInfo, CgRatio  } from "react-icons/cg"
// import { FaLock } from 'react-icons/fa';
// import { FaTimesCircle } from 'react-icons/fa';
// import Newsletter from '../components/Newsletter'
// import ScrollAnimation from 'react-animate-on-scroll'

// import { RiSecurePaymentLine } from "react-icons/ri"
// import { HiOutlineScale } from "react-icons/hi"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
const CustomBox = styled.div`

.infomenu{

   border-radius:12px;
   filter: drop-shadow(0px 0px 10px rgba(155,155,155,.5)); 
   background:rgba(0,0,0,0.08) !important;
}

`

const ProductDetails = () => (

<CustomBox style={{}}>


<Tabs className="infomenu" style={{minHeight:'20vh', width:'100%', maxWidth:'1000px', margin:'0 auto 2rem auto', overflow:'hidden', marginTop:'40px', fontSize:'clamp(1rem, 2vw, 2.5rem)', lineHeight:'120%'}}>
        <h2 className="specialfont" style={{fontSize:'clamp(2rem, 5vw, 3rem)', textAlign:'center', margin:'1rem 0'}}>Our Equipment</h2>
    <TabList style={{width:'100%', border:'0px solid yellow', padding:'0 1rem',fontSize:'clamp(1rem, 2.5vw, 2.8rem)'}}>
    <Tab><div className="iconmenu"><span>Menu 1</span></div></Tab>
    <Tab><div className="iconmenu"><span>Menu 2</span></div></Tab>
    <Tab><div className="iconmenu"><span>Menu 3</span></div></Tab>
    <Tab><div className="iconmenu"><span>Menu 4</span></div></Tab>
      
      
    </TabList>
 

   <TabPanel style={{padding:'0 1.5rem', width:'100%'}}>
           <h2 style={{fontSize:'clamp(1.3rem, 2.5vw, 2.8rem)', textAlign:'center', margin:'0 0 2rem 0'}}>CNC Mills – Total: 25</h2>
   <div className="" style={{display:'flex', flexDirection:'column', gap:'2vh'}}>

 {/* <Image alt="" filename="capabilities/capability1.jpg" style={{borderColor:'transparent', display:'inline-block'}} /> */}
 <ul className="splitRow" style={{background:'rgba(0, 0, 0, .1)', clear:'', margin:'0', padding:'5%', borderRadius:'12px', gap:'20px'}}>
 <li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
</ul>
</div>
           
    </TabPanel>



    <TabPanel style={{padding:'0 1.5rem', width:'100%',}}>
    <h2 style={{fontSize:'clamp(1.3rem, 2.5vw, 2.8rem)', textAlign:'center', margin:'0 0 2rem 0'}}>CNC Lathes – Total: 7</h2>
   <div className="" style={{display:'flex', flexDirection:'column', gap:'2vh'}}>
 {/* <Image alt="" filename="capabilities/capability3.jpg" style={{borderColor:'transparent',}} /> */}
 <ul className="splitRow" style={{background:'rgba(0, 0, 0, .1)', clear:'', margin:'0', padding:'5%', borderRadius:'12px', gap:'20px'}}>
<li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
</ul>
</div>

    </TabPanel>




     <TabPanel style={{padding:'0 1.5rem', width:'100%'}}>
           <h2 style={{fontSize:'clamp(1.3rem, 2.5vw, 2.8rem)', textAlign:'center', margin:'0 0 2rem 0'}}>Inspection Equipment</h2>
   <div className="" style={{display:'flex', flexDirection:'column', gap:'20px', justifyContent:'flex-start', alignItems:'center'}}>

 {/* <Image alt="" filename="capabilities/capability1.jpg" style={{borderColor:'transparent', display:'inline-block'}} /> */}
 <ul className="splitRow" style={{background:'rgba(0, 0, 0, .1)', margin:'0', padding:'5%', borderRadius:'12px',}}>
 <li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
</ul>
</div>
           
    </TabPanel>




    <TabPanel style={{padding:'0 1.5rem', width:'100%'}}>
    <h2 style={{fontSize:'clamp(1.3rem, 2.5vw, 2.8rem)', textAlign:'center', margin:'0 0 2rem 0'}}>Other Equipment</h2>
    <ul className="splitRow" style={{background:'rgba(0, 0, 0, .1)', clear:'', margin:'0', padding:'5%', borderRadius:'12px', gap:'20px'}}>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
    <li className="" style={{width:'50%', textAlign:''}}>Content</li>
</ul>
    </TabPanel>



    


   
<br />
  </Tabs>


</CustomBox>
  
)

export default ProductDetails