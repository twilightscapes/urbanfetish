import React from 'react'
import { navigate } from 'gatsby-link'
// import { FaEnvelope } from 'react-icons/fa'
import Layout from "../components/siteLayout"


// const Contact = class extends React.Component {
//   render() {
//     return (
     
//     )
//   }
// }

// export default Contact




function encode(data) {
  const formData = new FormData()

  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }

  return formData
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleAttachment = e => {
    this.setState({ [e.target.name]: e.target.files[0] })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
       .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    
    return (

      
        <section className="section">
          <div className="container1 innerpanel1" style={{padding: '0',}}>
            <div className="content" style={{padding: '0'}}>

              

              

              <form
              className="form "
                name="ccpa"
                method="post"
                action="/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
                id="ccpa-form"
              >

<p>Hytron takes our obligation to protect your data very seriously. In order to process your data request, we need some basic information from you. The information requested in this form is essential to Hytron's efforts to verify you are who you claim to be, to locate your data within our systems, and to determine whether we may have a lawful reason to deny your request.</p>

<p>Please note: If you choose not to provide the information requested in this form, we will be unable to process your request and will take no further action.</p>

               
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                  
                </div>

                <div className="form">
                <div className="field half1 right1" style={{width:'95%'}}>

                <label htmlFor="name" style={{padding: '0', margin: '0',}}>Your name:</label>
                    <input
                      className="input"
                      type={'text'}
                      name={'name'}
                      onChange={this.handleChange}
                      id={'name'}
                      required={true}
                      placeholder="Name"
                    />
                <label htmlFor="email" style={{padding: '0', margin: '0',}}>Email address used with Hytron</label>
                    <input
                      className="input"
                      type={'email'}
                      name={'email'}
                      onChange={this.handleChange}
                      id={'email'}
                      required={true}
                      placeholder="your@email.com"
                    />
                    
                    <label htmlFor="tfa_2223" style={{padding: '0', margin: '0',}}>In which country do you reside?</label>
                    <br />
                    <select id="tfa_2223" name="tfa_2223" data-filter-dependent="#tfa_2475" title="In which country do you reside?" aria-required="true" className="required select"><option value="">Please select...</option>
<option value="tfa_2224" id="tfa_2224" className="">Afghanistan</option>
<option value="tfa_2225" id="tfa_2225" className="">Aland Islands</option>
<option value="tfa_2226" id="tfa_2226" className="">Albania</option>
<option value="tfa_2227" id="tfa_2227" className="">Algeria</option>
<option value="tfa_2228" id="tfa_2228" className="">American Samoa</option>
<option value="tfa_2229" id="tfa_2229" className="">Andorra</option>
<option value="tfa_2230" id="tfa_2230" className="">Angola</option>
<option value="tfa_2231" id="tfa_2231" className="">Anguilla</option>
<option value="tfa_2232" id="tfa_2232" className="">Antartica</option>
<option value="tfa_2233" id="tfa_2233" className="">Antigua and Barbuda</option>
<option value="tfa_2234" id="tfa_2234" className="">Argentina</option>
<option value="tfa_2235" id="tfa_2235" className="">Armenia</option>
<option value="tfa_2236" id="tfa_2236" className="">Aruba</option>
<option value="tfa_2237" id="tfa_2237" data-conditionals="#tfa_2475" className="">Australia</option>
<option value="tfa_2238" id="tfa_2238" className="">Austria</option>
<option value="tfa_2239" id="tfa_2239" className="">Azerbaijan</option>
<option value="tfa_2240" id="tfa_2240" className="">Bahamas</option>
<option value="tfa_2241" id="tfa_2241" className="">Bahrain</option>
<option value="tfa_2242" id="tfa_2242" className="">Bangladesh</option>
<option value="tfa_2243" id="tfa_2243" className="">Barbados</option>
<option value="tfa_2244" id="tfa_2244" className="">Belarus</option>
<option value="tfa_2245" id="tfa_2245" data-conditionals="#tfa_2475" className="">Belgium</option>
<option value="tfa_2246" id="tfa_2246" className="">Belize</option>
<option value="tfa_2247" id="tfa_2247" className="">Benin</option>
<option value="tfa_2248" id="tfa_2248" className="">Bermuda</option>
<option value="tfa_2249" id="tfa_2249" className="">Bhutan</option>
<option value="tfa_2250" id="tfa_2250" className="">Bolivia, Plurinational State of</option>
<option value="tfa_2251" id="tfa_2251" className="">Bonaire, Sint Eustatius and Saba</option>
<option value="tfa_2252" id="tfa_2252" className="">Bosnia and Herzegovina</option>
<option value="tfa_2253" id="tfa_2253" className="">Botswana</option>
<option value="tfa_2254" id="tfa_2254" className="">Bouvet Island</option>
<option value="tfa_2255" id="tfa_2255" className="">Brazil</option>
<option value="tfa_2256" id="tfa_2256" className="">British Indian Ocean Territory</option>
<option value="tfa_2257" id="tfa_2257" className="">Brunei Darussalam</option>
<option value="tfa_2258" id="tfa_2258" className="">Bulgaria</option>
<option value="tfa_2259" id="tfa_2259" className="">Burkina Faso</option>
<option value="tfa_2260" id="tfa_2260" className="">Burundi</option>
<option value="tfa_2261" id="tfa_2261" className="">Cambodia</option>
<option value="tfa_2262" id="tfa_2262" className="">Cameroon</option>
<option value="tfa_2263" id="tfa_2263" data-conditionals="#tfa_2475" className="">Canada</option>
<option value="tfa_2264" id="tfa_2264" className="">Cape Verde</option>
<option value="tfa_2265" id="tfa_2265" className="">Cayman Islands</option>
<option value="tfa_2266" id="tfa_2266" className="">Central African Republic</option>
<option value="tfa_2267" id="tfa_2267" className="">Chad</option>
<option value="tfa_2268" id="tfa_2268" className="">Chile</option>
<option value="tfa_2269" id="tfa_2269" className="">China</option>
<option value="tfa_2270" id="tfa_2270" className="">Christmas Island</option>
<option value="tfa_2271" id="tfa_2271" className="">Cocos (Keeling) Islands</option>
<option value="tfa_2272" id="tfa_2272" className="">Colombia</option>
<option value="tfa_2273" id="tfa_2273" className="">Comoros</option>
<option value="tfa_2274" id="tfa_2274" className="">Congo</option>
<option value="tfa_2275" id="tfa_2275" className="">Congo, the Democratic Republic of the</option>
<option value="tfa_2276" id="tfa_2276" className="">Cook Islands</option>
<option value="tfa_2277" id="tfa_2277" className="">Costa Rica</option>
<option value="tfa_2278" id="tfa_2278" className="">Cote d'Ivoire</option>
<option value="tfa_2279" id="tfa_2279" className="">Croatia</option>
<option value="tfa_2280" id="tfa_2280" className="">Cuba</option>
<option value="tfa_2281" id="tfa_2281" className="">Curaçao</option>
<option value="tfa_2282" id="tfa_2282" className="">Cyprus</option>
<option value="tfa_2283" id="tfa_2283" className="">Czech Republic</option>
<option value="tfa_2284" id="tfa_2284" className="">Denmark</option>
<option value="tfa_2285" id="tfa_2285" className="">Djibouti</option>
<option value="tfa_2286" id="tfa_2286" className="">Dominica</option>
<option value="tfa_2287" id="tfa_2287" className="">Dominican Republic</option>
<option value="tfa_2288" id="tfa_2288" className="">Ecuador</option>
<option value="tfa_2289" id="tfa_2289" className="">Egypt</option>
<option value="tfa_2290" id="tfa_2290" className="">El Salvador</option>
<option value="tfa_2291" id="tfa_2291" data-conditionals="#tfa_2475" className="">England</option>
<option value="tfa_2292" id="tfa_2292" className="">Equatorial Guinea</option>
<option value="tfa_2293" id="tfa_2293" className="">Eritrea</option>
<option value="tfa_2294" id="tfa_2294" className="">Estonia</option>
<option value="tfa_2295" id="tfa_2295" className="">Ethiopia</option>
<option value="tfa_2296" id="tfa_2296" className="">Falkland Islands (Malvinas)</option>
<option value="tfa_2297" id="tfa_2297" className="">Faroe Islands</option>
<option value="tfa_2298" id="tfa_2298" className="">Fiji</option>
<option value="tfa_2299" id="tfa_2299" className="">Finland</option>
<option value="tfa_2300" id="tfa_2300" className="">France</option>
<option value="tfa_2301" id="tfa_2301" className="">French Guiana</option>
<option value="tfa_2302" id="tfa_2302" className="">French Polynesia</option>
<option value="tfa_2303" id="tfa_2303" className="">French Southern Territories</option>
<option value="tfa_2304" id="tfa_2304" className="">Gabon</option>
<option value="tfa_2305" id="tfa_2305" className="">Gambia</option>
<option value="tfa_2306" id="tfa_2306" className="">Georgia</option>
<option value="tfa_2307" id="tfa_2307" className="">Germany</option>
<option value="tfa_2308" id="tfa_2308" className="">Ghana</option>
<option value="tfa_2309" id="tfa_2309" className="">Gibraltar</option>
<option value="tfa_2310" id="tfa_2310" className="">Greece</option>
<option value="tfa_2311" id="tfa_2311" className="">Greenland</option>
<option value="tfa_2312" id="tfa_2312" className="">Grenada</option>
<option value="tfa_2313" id="tfa_2313" className="">Guadeloupe</option>
<option value="tfa_2314" id="tfa_2314" className="">Guam</option>
<option value="tfa_2315" id="tfa_2315" className="">Guatemala</option>
<option value="tfa_2316" id="tfa_2316" className="">Guernsey</option>
<option value="tfa_2317" id="tfa_2317" className="">Guinea</option>
<option value="tfa_2318" id="tfa_2318" className="">Guinea-Bissau</option>
<option value="tfa_2319" id="tfa_2319" className="">Guyana</option>
<option value="tfa_2320" id="tfa_2320" className="">Haiti</option>
<option value="tfa_2321" id="tfa_2321" className="">Heard Island and McDonald Islands</option>
<option value="tfa_2322" id="tfa_2322" className="">Holy See (Vatican City State)</option>
<option value="tfa_2323" id="tfa_2323" className="">Honduras</option>
<option value="tfa_2324" id="tfa_2324" className="">Hong Kong</option>
<option value="tfa_2325" id="tfa_2325" className="">Hungary</option>
<option value="tfa_2326" id="tfa_2326" className="">Iceland</option>
<option value="tfa_2327" id="tfa_2327" className="">India</option>
<option value="tfa_2328" id="tfa_2328" className="">Indonesia</option>
<option value="tfa_2329" id="tfa_2329" className="">Iran, Islamic Republic of</option>
<option value="tfa_2330" id="tfa_2330" className="">Iraq</option>
<option value="tfa_2331" id="tfa_2331" className="">Ireland</option>
<option value="tfa_2332" id="tfa_2332" className="">Isle of Man</option>
<option value="tfa_2333" id="tfa_2333" className="">Israel</option>
<option value="tfa_2334" id="tfa_2334" className="">Italy</option>
<option value="tfa_2335" id="tfa_2335" className="">Jamaica</option>
<option value="tfa_2336" id="tfa_2336" className="">Japan</option>
<option value="tfa_2337" id="tfa_2337" className="">Jersey</option>
<option value="tfa_2338" id="tfa_2338" className="">Jordan</option>
<option value="tfa_2339" id="tfa_2339" className="">Kazakhstan</option>
<option value="tfa_2340" id="tfa_2340" className="">Kenya</option>
<option value="tfa_2341" id="tfa_2341" className="">Kiribati</option>
<option value="tfa_2342" id="tfa_2342" className="">Korea, Democratic People's Republic of</option>
<option value="tfa_2343" id="tfa_2343" className="">Korea, Republic of</option>
<option value="tfa_2344" id="tfa_2344" className="">Kuwait</option>
<option value="tfa_2345" id="tfa_2345" className="">Kyrgyzstan</option>
<option value="tfa_2346" id="tfa_2346" className="">Laos, People's Democratic Republic</option>
<option value="tfa_2347" id="tfa_2347" className="">Latvia</option>
<option value="tfa_2348" id="tfa_2348" className="">Lebanon</option>
<option value="tfa_2349" id="tfa_2349" className="">Lesotho</option>
<option value="tfa_2350" id="tfa_2350" className="">Liberia</option>
<option value="tfa_2351" id="tfa_2351" className="">Libyan Arab Jamahiriya</option>
<option value="tfa_2352" id="tfa_2352" className="">Liechtenstein</option>
<option value="tfa_2353" id="tfa_2353" className="">Lithuania</option>
<option value="tfa_2354" id="tfa_2354" className="">Luxembourg</option>
<option value="tfa_2355" id="tfa_2355" className="">Macao</option>
<option value="tfa_2356" id="tfa_2356" className="">Macau</option>
<option value="tfa_2357" id="tfa_2357" className="">Macedonia, the former Yugoslav Republic of</option>
<option value="tfa_2358" id="tfa_2358" className="">Madagascar</option>
<option value="tfa_2359" id="tfa_2359" className="">Malawi</option>
<option value="tfa_2360" id="tfa_2360" className="">Malaysia</option>
<option value="tfa_2361" id="tfa_2361" className="">Maldives</option>
<option value="tfa_2362" id="tfa_2362" className="">Mali</option>
<option value="tfa_2363" id="tfa_2363" className="">Malta</option>
<option value="tfa_2364" id="tfa_2364" className="">Marshall Islands</option>
<option value="tfa_2365" id="tfa_2365" className="">Martinique</option>
<option value="tfa_2366" id="tfa_2366" className="">Mauritania</option>
<option value="tfa_2367" id="tfa_2367" className="">Mauritius</option>
<option value="tfa_2368" id="tfa_2368" className="">Mayotte</option>
<option value="tfa_2369" id="tfa_2369" className="">Mexico</option>
<option value="tfa_2370" id="tfa_2370" className="">Micronesia (Federated States of)</option>
<option value="tfa_2371" id="tfa_2371" className="">Moldova, Republic of</option>
<option value="tfa_2372" id="tfa_2372" className="">Monaco</option>
<option value="tfa_2373" id="tfa_2373" className="">Mongolia</option>
<option value="tfa_2374" id="tfa_2374" className="">Montenegro</option>
<option value="tfa_2375" id="tfa_2375" className="">Montserrat</option>
<option value="tfa_2376" id="tfa_2376" className="">Morocco</option>
<option value="tfa_2377" id="tfa_2377" className="">Mozambique</option>
<option value="tfa_2378" id="tfa_2378" className="">Myanmar</option>
<option value="tfa_2379" id="tfa_2379" className="">Namibia</option>
<option value="tfa_2380" id="tfa_2380" className="">Nauru</option>
<option value="tfa_2381" id="tfa_2381" className="">Nepal</option>
<option value="tfa_2382" id="tfa_2382" data-conditionals="#tfa_2475" className="">Netherlands</option>
<option value="tfa_2383" id="tfa_2383" className="">New Caledonia</option>
<option value="tfa_2384" id="tfa_2384" className="">New Zealand</option>
<option value="tfa_2385" id="tfa_2385" className="">Nicaragua</option>
<option value="tfa_2386" id="tfa_2386" className="">Niger</option>
<option value="tfa_2387" id="tfa_2387" className="">Nigeria</option>
<option value="tfa_2388" id="tfa_2388" className="">Niue</option>
<option value="tfa_2389" id="tfa_2389" className="">Norfolk Island</option>
<option value="tfa_2390" id="tfa_2390" className="">Northern Ireland</option>
<option value="tfa_2391" id="tfa_2391" className="">Northern Mariana Islands</option>
<option value="tfa_2392" id="tfa_2392" className="">Norway</option>
<option value="tfa_2393" id="tfa_2393" className="">Oman</option>
<option value="tfa_2394" id="tfa_2394" className="">Pakistan</option>
<option value="tfa_2395" id="tfa_2395" className="">Palau</option>
<option value="tfa_2396" id="tfa_2396" className="">Palestinian Territory, Occupied</option>
<option value="tfa_2397" id="tfa_2397" className="">Panama</option>
<option value="tfa_2398" id="tfa_2398" className="">Papua New Guinea</option>
<option value="tfa_2399" id="tfa_2399" className="">Paraguay</option>
<option value="tfa_2400" id="tfa_2400" className="">Peru</option>
<option value="tfa_2401" id="tfa_2401" className="">Philippines</option>
<option value="tfa_2402" id="tfa_2402" className="">Pitcairn</option>
<option value="tfa_2403" id="tfa_2403" className="">Poland</option>
<option value="tfa_2404" id="tfa_2404" className="">Portugal</option>
<option value="tfa_2405" id="tfa_2405" className="">Qatar</option>
<option value="tfa_2406" id="tfa_2406" className="">Reunion</option>
<option value="tfa_2407" id="tfa_2407" className="">Romania</option>
<option value="tfa_2408" id="tfa_2408" className="">Russian Federation</option>
<option value="tfa_2409" id="tfa_2409" className="">Rwanda</option>
<option value="tfa_2410" id="tfa_2410" className="">Saint Helena, Ascension and Tristan da Cunha</option>
<option value="tfa_2411" id="tfa_2411" className="">Saint Kitts and Nevis</option>
<option value="tfa_2412" id="tfa_2412" className="">Saint Lucia</option>
<option value="tfa_2413" id="tfa_2413" className="">Saint Martin (French part)</option>
<option value="tfa_2414" id="tfa_2414" className="">Saint Pierre and Miquelon</option>
<option value="tfa_2415" id="tfa_2415" className="">Saint Vincent and the Grenadines</option>
<option value="tfa_2416" id="tfa_2416" className="">Samoa</option>
<option value="tfa_2417" id="tfa_2417" className="">San Marino</option>
<option value="tfa_2418" id="tfa_2418" className="">Sao Tome and Principe</option>
<option value="tfa_2419" id="tfa_2419" className="">Saudi Arabia</option>
<option value="tfa_2420" id="tfa_2420" className="">Senegal</option>
<option value="tfa_2421" id="tfa_2421" className="">Serbia</option>
<option value="tfa_2422" id="tfa_2422" className="">Seychelles</option>
<option value="tfa_2423" id="tfa_2423" className="">Sierra Leone</option>
<option value="tfa_2424" id="tfa_2424" className="">Singapore</option>
<option value="tfa_2425" id="tfa_2425" className="">Sint Maarten (Dutch part)</option>
<option value="tfa_2426" id="tfa_2426" className="">Slovakia</option>
<option value="tfa_2427" id="tfa_2427" className="">Slovenia</option>
<option value="tfa_2428" id="tfa_2428" className="">Solomon Islands</option>
<option value="tfa_2429" id="tfa_2429" className="">Somalia</option>
<option value="tfa_2430" id="tfa_2430" className="">South Africa</option>
<option value="tfa_2431" id="tfa_2431" className="">South Georgia and the South Sandwich Islands</option>
<option value="tfa_2432" id="tfa_2432" className="">South Sudan</option>
<option value="tfa_2433" id="tfa_2433" className="">Spain</option>
<option value="tfa_2434" id="tfa_2434" className="">Sri Lanka</option>
<option value="tfa_2435" id="tfa_2435" className="">Sudan</option>
<option value="tfa_2436" id="tfa_2436" className="">Suriname</option>
<option value="tfa_2437" id="tfa_2437" className="">Svalbard and Jan Mayen</option>
<option value="tfa_2438" id="tfa_2438" className="">Swaziland</option>
<option value="tfa_2439" id="tfa_2439" className="">Sweden</option>
<option value="tfa_2440" id="tfa_2440" className="">Switzerland</option>
<option value="tfa_2441" id="tfa_2441" className="">Syrian Arab Republic</option>
<option value="tfa_2442" id="tfa_2442" className="">Taiwan</option>
<option value="tfa_2443" id="tfa_2443" className="">Tajikistan</option>
<option value="tfa_2444" id="tfa_2444" className="">Tanzania, United Republic of</option>
<option value="tfa_2445" id="tfa_2445" className="">Thailand</option>
<option value="tfa_2446" id="tfa_2446" className="">Timor-Leste</option>
<option value="tfa_2447" id="tfa_2447" className="">Togo</option>
<option value="tfa_2448" id="tfa_2448" className="">Tokelau</option>
<option value="tfa_2449" id="tfa_2449" className="">Tonga</option>
<option value="tfa_2450" id="tfa_2450" className="">Trinidad and Tobago</option>
<option value="tfa_2451" id="tfa_2451" className="">Tunisia</option>
<option value="tfa_2452" id="tfa_2452" className="">Turkey</option>
<option value="tfa_2453" id="tfa_2453" className="">Turkmenistan</option>
<option value="tfa_2454" id="tfa_2454" className="">Turks and Caicos Islands</option>
<option value="tfa_2455" id="tfa_2455" className="">Tuvalu</option>
<option value="tfa_2456" id="tfa_2456" className="">Uganda</option>
<option value="tfa_2457" id="tfa_2457" className="">Ukraine</option>
<option value="tfa_2458" id="tfa_2458" className="">United Arab Emirates</option>
<option value="tfa_2459" id="tfa_2459" data-conditionals="#tfa_2475" className="">United Kingdom</option>
<option value="tfa_2460" id="tfa_2460" data-conditionals="#tfa_2475" className="">United States</option>
<option value="tfa_2461" id="tfa_2461" className="">United States Minor Outlying Islands</option>
<option value="tfa_2462" id="tfa_2462" className="">Uruguay</option>
<option value="tfa_2463" id="tfa_2463" className="">Uzbekistan</option>
<option value="tfa_2464" id="tfa_2464" className="">Vanuatu</option>
<option value="tfa_2465" id="tfa_2465" className="">Venezuela, Bolivarian Republic of</option>
<option value="tfa_2466" id="tfa_2466" className="">Viet Nam</option>
<option value="tfa_2467" id="tfa_2467" className="">Virgin Islands, British</option>
<option value="tfa_2468" id="tfa_2468" className="">Virgin Islands (U.S.)</option>
<option value="tfa_2469" id="tfa_2469" data-conditionals="#tfa_2475" className="">Wales</option>
<option value="tfa_2470" id="tfa_2470" className="">Wallis and Futuna</option>
<option value="tfa_2471" id="tfa_2471" className="">Western Sahara</option>
<option value="tfa_2472" id="tfa_2472" className="">Yemen</option>
<option value="tfa_2473" id="tfa_2473" className="">Zambia</option>
<option value="tfa_2474" id="tfa_2474" className="">Zimbabwe</option></select>

<br clear="all" />


<label htmlFor="tfa_2184" style={{padding: '0', margin: '0',}}>What type of request are you making?</label><br />

<select id="tfa_2184" name="tfa_2184" title="What type of request are you making?" aria-required="true" className="required"><option value="">Please select...</option>
<option value="tfa_2185" id="tfa_2185" data-conditionals="#tfa_2187,#tfa_2208" className="">Access - I would like to get a report of the Personal Information Hytron has about me</option>
<option value="tfa_2186" id="tfa_2186" data-conditionals="#tfa_2214" className="">Deletion - I would like to have the Personal Information you have about me forgotten</option>
<option value="tfa_2197" id="tfa_2197" data-conditionals="#tfa_2187" className="">Right to Know - I would like to receive a report on the categories of Personal Information Hytron has about me</option></select>


<br />
<p>Please provide any information that might be helpful in fulfilling your request in regards to how you have engaged with Hytron.</p>


<textarea style={{maxHeight:'100px'}} id="tfa_2192" name="tfa_2192"></textarea>



<p>We recognize our responsibility to keep your personal information safe and secure, and we have systems, processes, and expert staff devoted to implementing such security controls, and safeguarding data protection, across our business. In order to fulfill this request, Hytron will need to reasonably validate that you are the owner of the account for which this request is being submitted. This may require additional follow-up to ensure confidence that this request can be fulfilled. We will work to fulfill this request in a timely manner that complies with the legal requirements in your jurisdiction.</p>

<p>Please read and select the applicable option below:</p>




    <div style={{display:'flex'}}>

      
      <label className="label postField" id="tfa_2206-L" htmlFor="tfa_2206" style={{width:'50%', border:'1px solid', borderRadius:'6px', padding:'4%', margin:'3px', textAlign:'center', display:'flex', justifyContent:'center', alignContent:'center', fontSize:'clamp(1rem, 2vw, 2rem)', paddingTop:'5rem'}}>
      <input type="radio" value="tfa_2206" className="" id="tfa_2206" name="tfa_2202" aria-labelledby="tfa_2206-L" data-tfa-labelledby="tfa_2202-L tfa_2206-L" required /><span class="checkmark"></span>
      <span style={{textAlign:'left'}}>I declare under penalty of perjury that I am the individual consumer whose personal information is the subject of the request.</span></label>
      
      
      
      <label className="label postField" id="tfa_2207-L" htmlFor="tfa_2207" style={{width:'50%', border:'1px solid', borderRadius:'6px', padding:'4%', margin:'3px', textAlign:'center', display:'flex', justifyContent:'center', alignContent:'center', fontSize:'clamp(1rem, 2vw, 2rem)', paddingTop:'5rem'}}>
      <input type="radio" value="tfa_2207" className="" id="tfa_2207" name="tfa_2202" aria-labelledby="tfa_2207-L" data-tfa-labelledby="tfa_2202-L tfa_2207-L" required /><span class="checkmark"></span>
        <span style={{textAlign:'left'}}>I declare under penalty of perjury that I am the Authorized Agent of the individual whose personal information is the subject of the request. I understand I will be required to provide proof in writing of my status as the individuals Authorized Agent and additional information to confirm my identity.</span></label>
</div>

<p>At Hytron, we take your right to privacy seriously. We strive to protect the rights, freedoms and dignity of all those who entrust us with their personal information, both customers and employees. </p>
            
<br />
               
<div className="special2 grad"  style={{color:'#fff', textDecoration:'none', display:'flex', justifyContent:'center', position:'relative', width:'230px', margin:'0 auto', padding:'0 ',}}>
                
                <input type="submit" value="Submit Form" className="button specialfont2" style={{background:'', border:'', color:'', cursor:'pointer', margin:'', padding:'', width:'', float:'',}} />
       
                
                </div>
                
                <div style={{display:'none', fontSize: '70%', padding: '0px 3%', marginTop:'20px', textAlign: 'center',}}><a style={{textAlign: 'center', paddingTop: '0', paddingBottom: '0', textDecoration: 'underline', color:'inherit',}} href="/privacy">Privacy policy</a>
                </div>

</div>
</div>    
                



<div className="spacer66"></div>
                
              </form>
              
            </div>
          </div>
        </section>      
      

    )
  }
}
<Layout />