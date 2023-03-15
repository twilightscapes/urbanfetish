import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { MdPlayArrow } from "react-icons/md"
import { MdPause } from "react-icons/md"
import { MdVolumeOff } from "react-icons/md"
// import { MdVolumeDown } from "react-icons/md"
import { MdVolumeUp } from "react-icons/md"
import useSiteMetadata from "../hooks/SiteMetadata"
// import { Link } from "gatsby"











const Controls = forwardRef(
  (
    {
      // onSeek,
      // onSeekMouseDown,
      // onSeekMouseUp,
      // onDuration,
      // onRewind,
      onPlayPause,
      // onFastForward,
      playing,
      // played,
      // elapsedTime,
      // totalDuration,
      onMute,
      muted,
      // onVolumeSeekDown,
      // onChangeDispayFormat,
      // playbackRate,
      // onPlaybackRateChange,
      // onToggleFullScreen,
      volume,
      // onVolumeChange,
      // onBookmark,
    },
    ref
  ) => {
    // const classes = useStyles();
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const handleClick = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //   setAnchorEl(null);
    // };

    // const open = Boolean(anchorEl);
    // const id = open ? "simple-popover" : undefined;

    const { iconimage } = useSiteMetadata()


    return (

<>



      {playing ? (
        <>

        </>
      ) : (
  <>


  <div style={{position:'absolute', background:'#111', height:'110vh', width:'100%', zIndex:'1', top:'0', right:'0', textAlign:'center', display:'grid', placeContent:'center' }}>
 
  <img className="homepage-bg" src={iconimage} width="300px" height="150px" alt="MemeGenes" style={{ width:'30vw', height:'', filter:'drop-shadow(2px 2px 2px #000)', background:'transparent !important', position:'relative', bottom:'20vh'}} />

  </div>
  </>
      )}




      


<div ref={ref} className="controlsbox" style={{width:'', height:'', border:'0px solid red', }}>

      {/* <div className="contact" style={{position:'', bottom:'', zIndex:'',  left:'0', right:'0', display:'flex', justifyContent:'center', width:'200px', margin:'0 auto'}}>
  <Link state={{modal: true}}  to="/contact/" className="navbar-item  button fire" style={{margin:'', textDecoration:'none'}}>Contact Me</Link>
</div> */}
                <button
                  onClick={onPlayPause}
                  className="controls" 
                  style={{
                    animation:'fade1',
                    animationDuration:'1s',
                    animationDelay:'5s',
                    opacity:'1',
                    animationFillMode:'forwards',
                    position:'relative',
                    zIndex:'',
                    right:'',
                    bottom:'',
                    display:'grid',
                    placeContent:'center',
                    width:'60px',
                    height:'60px',
                    fontWeight:'bold', padding:'.3rem', color:'#999', fontSize:'1rem',  borderRadius:'8px', border:'1px solid #666', cursor:'pointer',
                }}
                >
                  {/* <MdPlayArrow style={{fontSize:'50px', position:'absolute'}}  /> */}
                  {playing ? (
                    <>
                    <MdPause className="hudicon" style={{}} />
                    </>
                  ) : (
              <>
              <MdPlayArrow className="hudicon" style={{}}  />
              </>
                  )}
                </button>



      




                <button
                  // onClick={() => setState({ ...state, muted: !state.muted })}
                  onClick={onMute}
                  className="controls "
                  style={{
                }}
                >
                  {muted ? (
                    <MdVolumeOff className="hudicon" fontSize="" style={{}}  />
                  ) : volume > 0.5 ? (
                    <MdVolumeUp className="hudicon" fontSize="" style={{}}  />
                  ) : (
                    <MdVolumeUp className="hudicon" fontSize="" style={{}}  />
                  )}
                </button>

      </div>
      
      </>
    );
  }
);

Controls.propTypes = {
  onSeek: PropTypes.func,
  onSeekMouseDown: PropTypes.func,
  onSeekMouseUp: PropTypes.func,
  onDuration: PropTypes.func,
  onRewind: PropTypes.func,
  onPlayPause: PropTypes.func,
  onFastForward: PropTypes.func,
  onVolumeSeekDown: PropTypes.func,
  onChangeDispayFormat: PropTypes.func,
  onPlaybackRateChange: PropTypes.func,
  onToggleFullScreen: PropTypes.func,
  onMute: PropTypes.func,
  playing: PropTypes.bool,
  played: PropTypes.number,
  elapsedTime: PropTypes.string,
  totalDuration: PropTypes.string,
  muted: PropTypes.bool,
  playbackRate: PropTypes.number,
};



export default Controls;


















//  <div ref={ref} className={classes.controlsWrapper} style={{position:'', zIndex:''}}>
//         <Grid
//           container
//           direction="column"
//           justify="space-between"
//           style={{ flexGrow: 1 }}
//         >
//           <Grid
//             container
//             direction="row"
//             alignItems="center"
//             justify="space-between"
//             style
//             style={{ padding: 16 }}
//           >
//             <Grid item>
//               <Typography variant="h5" style={{ color: "#fff" }}>
//                 Video Title
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Button
//                 onClick={onBookmark}
//                 variant="contained"
//                 color="primary"
//                 startIcon={<BookmarkIcon />}
//               >
//                 Bookmark
//               </Button>
//             </Grid>
//           </Grid>
//           <Grid container direction="row" alignItems="center" justify="center" style={{animation:'fadeout'}}>
//             <IconButton
//               onClick={onRewind}
//               className={classes.controlIcons}
//               aria-label="rewind"
//             >
//               <FastRewindIcon
//                 className={classes.controlIcons}
//                 fontSize="inherit"
//               />
//             </IconButton>
//             <IconButton
//               onClick={onPlayPause}
//               className={classes.controlIcons}
//               aria-label="play"
//             >
//               {playing ? (
//                 <PauseIcon fontSize="inherit" />
//               ) : (
//                 <PlayArrowIcon fontSize="inherit" />
//               )}
//             </IconButton>
//             <IconButton
//               onClick={onFastForward}
//               className={classes.controlIcons}
//               aria-label="forward"
//             >
//               <FastForwardIcon fontSize="inherit" />
//             </IconButton>
//           </Grid>
//           {/* bottom controls */}
//           <Grid
//             container
//             direction="row"
//             justify="space-between"
//             alignItems="center"
//             style={{ padding: 16 }}
//           >
//             <Grid item xs={12}>
//               <PrettoSlider
//                 min={0}
//                 max={100}
//                 ValueLabelComponent={(props) => (
//                   <ValueLabelComponent {...props} value={elapsedTime} />
//                 )}
//                 aria-label="custom thumb label"
//                 value={played * 100}
//                 onChange={onSeek}
//                 onMouseDown={onSeekMouseDown}
//                 onChangeCommitted={onSeekMouseUp}
//                 onDuration={onDuration}
//               />
//             </Grid>

//             <Grid item>
//               <Grid container alignItems="center">
//                 <IconButton
//                   onClick={onPlayPause}
//                   className={classes.bottomIcons}
//                 >
//                   {playing ? (
//                     <PauseIcon fontSize="large" />
//                   ) : (
//                     <PlayArrowIcon fontSize="large" />
//                   )}
//                 </IconButton>

//                 <IconButton
//                   // onClick={() => setState({ ...state, muted: !state.muted })}
//                   onClick={onMute}
//                   className={`${classes.bottomIcons} ${classes.volumeButton}`}
//                 >
//                   {muted ? (
//                     <VolumeMute fontSize="large" />
//                   ) : volume > 0.5 ? (
//                     <VolumeUp fontSize="large" />
//                   ) : (
//                     <VolumeDown fontSize="large" />
//                   )}
//                 </IconButton>

//                 <Slider
//                   min={0}
//                   max={100}
//                   value={muted ? 0 : volume * 100}
//                   onChange={onVolumeChange}
//                   aria-labelledby="input-slider"
//                   className={classes.volumeSlider}
//                   onMouseDown={onSeekMouseDown}
//                   onChangeCommitted={onVolumeSeekDown}
//                 />
//                 <Button
//                   variant="text"
//                   onClick={
//                     onChangeDispayFormat
//                     //     () =>
//                     //   setTimeDisplayFormat(
//                     //     timeDisplayFormat == "normal" ? "remaining" : "normal"
//                     //   )
//                   }
//                 >
//                   <Typography
//                     variant="body1"
//                     style={{ color: "#fff", marginLeft: 16 }}
//                   >
//                     {elapsedTime}/{totalDuration}
//                   </Typography>
//                 </Button>
//               </Grid>
//             </Grid>

//             <Grid item>
//               <Button
//                 onClick={handleClick}
//                 aria-describedby={id}
//                 className={classes.bottomIcons}
//                 variant="text"
//               >
//                 <Typography>{playbackRate}X</Typography>
//               </Button>

//               <Popover
//                 container={ref.current}
//                 open={open}
//                 id={id}
//                 onClose={handleClose}
//                 anchorEl={anchorEl}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//                 transformOrigin={{
//                   vertical: "bottom",
//                   horizontal: "left",
//                 }}
//               >
//                 <Grid container direction="column-reverse">
//                   {[0.5, 1, 1.5, 2].map((rate) => (
//                     <Button
//                       key={rate}
//                       //   onClick={() => setState({ ...state, playbackRate: rate })}
//                       onClick={() => onPlaybackRateChange(rate)}
//                       variant="text"
//                     >
//                       <Typography
//                         color={rate === playbackRate ? "secondary" : "inherit"}
//                       >
//                         {rate}X
//                       </Typography>
//                     </Button>
//                   ))}
//                 </Grid>
//               </Popover>
//               <IconButton
//                 onClick={onToggleFullScreen}
//                 className={classes.bottomIcons}
//               >
//                 <FullScreen fontSize="large" />
//               </IconButton>
//             </Grid>
//           </Grid>
//         </Grid>
// </div>