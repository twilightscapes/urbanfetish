import React, { Component } from "react"
//import { render } from "react-dom"

class ContactMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: "",
      locations: [
        {
          name: "FRP Office",
          location: { lat: 39.92637447674843, lng: -86.10587621626418 },
        },
      ],
    }
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options
    )
    this.addMarker(map)
    console.log(process.env.GATSBY_GOOGLE_MAPS_API_KEY);

  }

  addMarker(map) {
    //const bounds = new window.google.maps.LatLngBounds()
    this.state.locations.map((location, i) => {
      const contentString =
        '<div class="contact-info-window">' +
        "<h1>FRP INC</h1>" +
        "<p>3535 East 96th Street, Suite 126 Indianapolis, IN 46240</p>" +
        '<a target="_blank" href="https://maps.google.com/?q=' +
        "Fink Roberts & Petrie Inc" +
        " " +
        "3535 East 96th Street, Suite 126 Indianapolis, Indiana 46240" +
        '">Open in Google Maps</a>' +
        "</div>"
      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      })

      const marker = new window.google.maps.Marker({
        position: location.location,
        map: map,
      })

      marker.addListener("click", () => {
        infowindow.open(map, marker)
      })

      //   bounds.extend(
      //     new window.google.maps.LatLng(
      //       location.location.lat,
      //       location.location.lng
      //     )
      //   )

      return 0
    })
    //map.fitBounds(bounds)
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement("script")
      s.type = "text/javascript"
      s.src = `https://maps.google.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS_API_KEY}`
      var x = document.getElementsByTagName("script")[0]
      x.parentNode.insertBefore(s, x)
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener("load", e => {
        console.log("finished loading")
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return <div className="contact-map" id={this.props.id} style={{display:'block', width:'100vw', height:'100vh'}} />
  }
}

export default ContactMap
