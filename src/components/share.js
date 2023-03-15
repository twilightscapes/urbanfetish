import * as React from "react"
import { ShareSocial } from 'react-share-social' 
import styled from "styled-components"

const CustomBox = styled.div`



`

const style = {
  root: {
    background: 'transparent',
    borderRadius: '12px',
    border: '0',
    color: '#fff',
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    padding:'0',
    width:'100%',
    minWidth: '300px',
  },


};

const Share = () => {
  
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
<CustomBox style={{}}>
{/* <h4 style={{textAlign:'center', fontSize:'130%', marginTop:'2rem'}}>Sharing IS Caring!</h4> */}
    <ShareSocial
    id="share"
    style={style}
    // style={{background:'transparent !important'}}
    url ={url}
    // title="Sharing IS Caring!"
    socialTypes={['facebook','twitter','reddit','linkedin']}>

      </ShareSocial>
    </CustomBox>


  );
};

export default Share



