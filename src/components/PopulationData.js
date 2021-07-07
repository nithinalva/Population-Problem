import React,{useEffect,useState} from 'react'
import axios from 'axios'

import { sortdata } from '../util'



const PopulationData = () => {

    

    const [countries,setcountries] =useState([])

    useEffect(() => {


        const fetchdata = async()=>{

            try{

                const response=await axios("https://cdn.jsdelivr.net/gh/apilayer/restcountries@3dc0fb110cd97bce9ddf27b3e8e1f7fbe115dc3c/src/main/resources/countriesV2.json")
             console.log(response.data)
                   
                let countryData= sortdata(response.data).slice(0,20).map((country)=>({
                        country:country.name,
                        latitude:country.latlng[0],
                        longtitude:country.latlng[1],
                        population:(country.population),
                        latInRad:country.latlng[0]*(Math.PI/180.0),
                        longInRad:country.latlng[1]*(Math.PI/180.0)
                }))
                // console.log(countryData)
                setcountries(countryData)
                
            }catch(err){

                console.log(err)
            }
        }
   
        fetchdata()
    }, [])
    
 
    // let blankData=[90,20]
    // console.log(Haversine(blankData))


//     const data=countries.reduce((a,b)=>{

//         let dlon=b.longInRad-a;
//         let dlat=b.latInRad-a
//         let answer=Math.pow(Math.sin(dlat/2),2)+Math.cos(a)*Math.cos(b.latInRad)*Math.pow(Math.sin(dlon/2),2)
        
        
//           return answer
          
//     },0)

//     const computeDistance=Data=>{

//         let c = 2 * Math.asin(Math.sqrt(Data));
//         let r=6371;
//         return (c*r).toFixed(2)
//     }

// console.log(computeDistance(data))



//2nd attempt

let results=[]

const distance=data=>{

    for(let i=0;i<data.length-1;i++){

       let lat1=data[i].latInRad
        let long1=data[i].longInRad

       let lat2=data[i+1].latInRad
       let  long2=data[i+1].longInRad

        let dLon=long2-long1
        let dLat=lat2-lat1
        let a=Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        let c =2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
   
        // Radius of earth in kilometers. 

        let r = 6371;
   
        // calculate the result
        let sum=parseFloat((c * r).toFixed(2));
        // i+=1
        results.push(sum)

        
        
    }
}



distance(countries)

console.log(results)
let finalanswer= results.reduce(((a,b)=>(a+b)),0)

console.log(finalanswer)


    return (
        <div>
            
        </div>
    )
}

export default PopulationData
