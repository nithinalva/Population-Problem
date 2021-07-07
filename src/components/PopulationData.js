import React,{useEffect,useState} from 'react'
import axios from 'axios'
import haversine from 'haversine-distance'
import { sortdata } from '../util'
import matrix from 'matrix-js'
import haversineDistance from 'haversine-distance';
import Mapdata from './Mapdata'
import Tabledata from './Tabledata'
import ReactTooltip from 'react-tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Card,InputGroup,FormControl,Button } from 'react-bootstrap'
import numeral from 'numeral'
import { BrowserRouter as Router,Link } from 'react-router-dom'


const PopulationData = () => {

    

    const [countries,setcountries] =useState([])
    const [content, setContent] = useState("");
    const [limit,setlimit]=useState(0);
    const changeLimitHandler=(value)=>{
        setlimit(parseInt(value))
        
            
        }

        
    useEffect(() => {


        const fetchdata = async()=>{

            try{

                const response=await axios("https://cdn.jsdelivr.net/gh/apilayer/restcountries@3dc0fb110cd97bce9ddf27b3e8e1f7fbe115dc3c/src/main/resources/countriesV2.json")
                console.log(response.data)
                   
                let countryData= sortdata(response.data,limit?limit:0).slice(0,20).map((country)=>({
                        country:country.name,
                        latitude:country.latlng[0],
                        longtitude:country.latlng[1],
                        population:(country.population),
                        latInRad:country.latlng[0]*(Math.PI/180),
                        longInRad:country.latlng[1]*(Math.PI/180),
                        latlng:country.latlng
                }))
                // console.log(countryData)
                setcountries(countryData)
                
            }catch(err){

                console.log(err)
            }
        }
   
        fetchdata()
    }, [limit])
    




 
/// Manual MethodPart1 
let sum=0;
let computedData=[]
function haversineManual(lat1, lon1, lat2, lon2,country1,country2)
{
    
    let latitude1=lat1;
    let longitude1=lon1;
    let latitude2=lat2;
    let longitude2=lon2;

    let dLat = (lat2 - lat1) * 3.1415926535 / 180;
    let dLon = (lon2 - lon1) * 3.1415926535 / 180;
       
   
    lat1 = (lat1) * 3.1415926535 / 180;
    lat2 = (lat2) * 3.1415926535/ 180;
     
  
    let a = Math.pow(Math.sin(dLat / 2), 2) +
               Math.pow(Math.sin(dLon / 2), 2) *
               Math.cos(lat1) *
               Math.cos(lat2);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));
    let finalAnswer= (rad * c);
   finalAnswer=Math.round(finalAnswer * 100) / 100
    sum=sum+finalAnswer
    sum=Math.round(sum * 100) / 100
    const MapData={
        latlngfrom:[latitude1,longitude1],
        latlongTo:[latitude2,longitude2],
        from:country1,
        to:country2,
        total:sum,
        distance:finalAnswer
    }
    computedData.push(MapData)
    return sum
     
}



//ManualMethod-2 (optional)

const haversineManual2=(lat1,lon1,lat2,lon2)=>{


    var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c// Distance in km
 
  sum=sum+parseFloat(d.toFixed(2))
  return sum.toFixed(2)

}

function deg2rad(deg) {
    return deg * (Math.PI/180)
  }




//using NPM packages (optional) //wrong answer 
const haversineManual3=(lat1,long1,lat2,long2,country1,country2)=>{

    const a=[lat1,long1]
    const b=[lat2,long2]
    const answer=haversine(a,b)
  
    sum=sum+answer
    const MapData={
        latlngfrom:[lat1,long1],
        latlongTo:[lat2,long2],
        from:country1,
        to:country2,
        total:sum
    }
    computedData.push(MapData)
    return sum.toFixed(2)
}











let visited=[]

const distanceBetween=(data)=>{
    
    let hev
    for(let i=0;i<data.length;i++){

        for(let j=1;j<data.length;j++){
    
            let ans=visited.includes(data[j].country)
            // console.log(ans)
            
           if(data[i].country!==data[j].country && !ans ){
               
            hev=haversineManual(data[i].latlng[0],data[i].latlng[1],data[j].latlng[0],data[j].latlng[1],data[i].country,data[j].country)
            } 
          
        }
        visited.push(data[i].country)
        
    }
    //console.log(visited)

    return hev
}


// console.log(distanceBetween(countries))


    return (
        <div>
            {/* <h1>{computeDIstance(countries)} KM</h1> */}
        {/* <Mapdata countries={countries} mapdata={computedData} setTooltipContent={setContent} /> */}
        {/* <ReactTooltip>{content}</ReactTooltip>
        <Tabledata mapdata={computedData}/> */}
    
        <Container className>
        <Router>
        <Card className="width:18rem  " >
        <Card.Body>
            <Card.Title>
                Please Set a Limit
            </Card.Title>
            <InputGroup size="lg" className="mb-3" onChange={e=>changeLimitHandler(e.target.value)}>
    <InputGroup.Text id="inputGroup-sizing-sm">POPULATION LIMIT</InputGroup.Text>
    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
  </InputGroup>
  <div className="row justify-content-center p-3">
      <div>
          <h1>{distanceBetween(countries)} Kilometers</h1>
          <h5>20 Countries with the population greater than or equal to  {limit?limit:0}</h5>
          <div className="row p-2">
             
          {visited.map((country)=>(
             <p>{country},</p>
         ))}
          </div>
        
      </div>
  </div>
  <div className="row">


  <div className="col-6 d-flex justify-content-center">
  
  <Button variant="primary"><Link to={{pathname: "https://nithin-alva.netlify.app/"}} target="_blank"  >CONTACT ME </Link></Button>
  </div>
  <div className="col-6 d-flex justify-content-center">
  
  <Button variant="dark"><Link to={{pathname: "https://github.com/nithinalva/Rckr-assesment-Population-Problem"}} target="_blank"  >SOURCE CODE </Link> </Button>

  </div>
  
  </div>
  
        </Card.Body>
        </Card>
        </Router>
        </Container>
        <div className="p-4">
        <Tabledata mapdata={computedData}/>
        </div>
         {/* {console.log(computedData)} */}
         <div className=" mt-4  map-box " >
             <h1 className="p-3">Geographical Representation</h1>
        <Mapdata countries={countries} mapdata={computedData} setTooltipContent={setContent} /> 
         <ReactTooltip>{content}</ReactTooltip>
         </div >
       {console.log(visited)}
        </div>
    )
}

export default PopulationData
