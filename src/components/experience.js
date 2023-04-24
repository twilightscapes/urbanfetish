import React, { Component } from "react"
import Icon1 from "../../static/content/map/icons/icon-1.png"
import Icon2 from "../../static/content/map/icons/icon-2.png"
import Icon3 from "../../static/content/map/icons/icon-3.png"
import Icon4 from "../../static/content/map/icons/icon-4.png"
import Icon5 from "../../static/content/map/icons/icon-5.png"
import Icon6 from "../../static/content/map/icons/icon-6.png"
import Icon7 from "../../static/content/map/icons/icon-7.png"
import Icon8 from "../../static/content/map/icons/icon-8.png"
import Icon9 from "../../static/content/map/icons/icon-9.png"
// import Statistics from "./statistics"

const Springfield = {
  lat: 39.781719,
  lng: -89.650146,
}

const Legends = [
  {
    name: "Cultural/Civic",
    icon: Icon1,
  },
  {
    name: "Healthcare",
    icon: Icon2,
  },
  {
    name: "Higher Education",
    icon: Icon3,
  },
  {
    name: "Hospitality/Housing Retail",
    icon: Icon4,
  },
  {
    name: "Industrial/Warehouse",
    icon: Icon5,
  },
  {
    name: "Office/Parking",
    icon: Icon6,
  },
  {
    name: "School(K-12)",
    icon: Icon7,
  },
  {
    name: "Sports/Recreation",
    icon: Icon8,
  },
  {
    name: "Water",
    icon: Icon9,
  },
]

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //map: "",
    }

    this.observerRef = React.createRef()
    this.mapRef = React.createRef()
  }

  onScriptLoad() {
    const zoom = window.innerWidth < 600 ? 4 : 6
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),

      {
        center: Springfield,
        zoom: zoom,
        mapTypeId: "terrain",
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [
              {
                weight: "2.00",
              },
            ],
          },
          {
            featureType: "all",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#9c9c9c",
              },
            ],
          },
          {
            featureType: "all",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                color: "#f2f2f2",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 45,
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#eeeeee",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#7b7b7b",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [
              {
                color: "#46bcec",
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#c8d7d4",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#070707",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#ffffff",
              },
            ],
          },
        ],
      }
    )

    var src =
      "https://github.com/venkateshcp/frpincstatic/blob/56dfc6d28a1d78fb7baf222b90229988407421f1/frp.kmz?raw=true"
      // "https://github.com/completeweb-site/base/blob/decap/static/content/map/frp.kmz?raw=true"
      
    //this.addMarker(map)


    new window.google.maps.KmlLayer(src, {
      //suppressInfoWindows: true,
      preserveViewport: true,
      map: map,
    })

    if (document.getElementById("legend") === null) {
      console.log("comes here!")
      const div = document.createElement("div")
      div.innerHTML = "<h3>Legend</h3>"
      div.className = "legend"
      div.id = "legend"
      document.getElementById(this.props.id).appendChild(div)

      for (const key in Legends) {
        const legend = Legends[key]
        const name = legend.name
        const icon = legend.icon
        const div = document.createElement("div")
        div.innerHTML =
          '<img src="' +
          icon +
          '" style="width: 25%"> <span>' +
          name +
          "</span>"

        document.getElementById("legend").appendChild(div)
      }
    }

    map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(
      document.getElementById("legend")
    )
  }

  componentDidMount() {
    this.observerRef.current = new IntersectionObserver(
      entries => {
        //this.setState({ isVisible: entries[0].isIntersecting })
        //console.log(entries)
        //console.log(this.state.isVisible)

        if (entries[0].isIntersecting) {
          if (!window.google) {
            var s = document.createElement("script")
            s.type = "text/javascript"
            s.src = `https://maps.google.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`
            var x = document.getElementsByTagName("script")[0]
            x.parentNode.insertBefore(s, x)
            // Below is important.
            //We cannot access google.maps until it's finished loading
            s.addEventListener("load", e => {
              //console.log("finished loading")
              this.onScriptLoad()
            })
          } else {
            this.onScriptLoad()
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    )

    this.observerRef.current.observe(this.mapRef.current)
    //console.log(this.state.isVisible)
    //if (this.state.isVisible) {
    //console.log("Intersecting")
    //}

    // if (!window.google) {
    //   var s = document.createElement("script")
    //   s.type = "text/javascript"
    //   s.src = `https://maps.google.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`
    //   var x = document.getElementsByTagName("script")[0]
    //   x.parentNode.insertBefore(s, x)
    //   // Below is important.
    //   //We cannot access google.maps until it's finished loading
    //   s.addEventListener("load", e => {
    //     //console.log("finished loading")
    //     this.onScriptLoad()
    //   })
    // } else {
    //   this.onScriptLoad()
    // }
  }

  componentWillUnmount() {
    this.observerRef.current.disconnect()
  }

  render() {
    return (
      <div className="map-section" ref={this.mapRef}>
        <div className="section-title">
          <span className="top-text">
            E<span className="half-color">x</span>perience
          </span>
          <span className="horizontal-line"></span>
        </div>
        <div className="statistics-container">
      <div className="statistics-blurb-wrapper">
        <span>
          Established in 1944 with many years of experience, FRP has a
          broad portfolio of project types across a wide geographic region.
          Zoom, pan, and click the icons on the interactive map for details of
          some of FRP's work in recent decades.
        </span>
      </div>
    </div>
        <div className="kml-map" id={this.props.id} />
        {/* <div id="legend" className="legend">
          <h3>Legend</h3>
        </div> */}
      </div>
    )
  }
}

export default Map
