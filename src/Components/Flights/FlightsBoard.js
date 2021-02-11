import { useState, useEffect, React} from 'react'
import {flightService} from '../../Service/FlightService'
import Flight from './Flight'

export default function FlightsBoard() {
  const [flights, setFlights] = useState(null)
  const [filterByDepartureCity, setDepartureCity] = useState("")
  const [filterByPrice, setPrice] = useState("")
  const [filterByLandingCity, setLandingCity] = useState("")
  const [filterBy, setFilterBy] = useState({})

  useEffect(() => {
    getFlights()
})
  const getFlights= async () =>{
    const data = await flightService.query(filterBy)
    setFlights(data)
  }

  const filterChange=(event) =>{
    if (event.target.name === "departure_city"){
      setDepartureCity(event.target.value)
    }     
    if (event.target.name === "landing_city"){
      setLandingCity(event.target.value)
    } 
    if (event.target.name === "stops"){
      setPrice(event.target.value)
    }
    const filterObject = {
      departure_city: event.target.name === "departure_city" ? event.target.value : filterByDepartureCity,
      landing_city: event.target.name === "landing_city" ? event.target.value : filterByLandingCity,
      stops: event.target.name === "stops" ? event.target.value : filterByPrice
    }
    setFilterBy(filterObject)  
  }

  if (!flights || flights.length === 0) return <div>Loading...</div> 
  else{
    return (
      <div className='flightList'>
        <div className="main" >
        <input onChange={filterChange} type="text" name="departure_city" placeholder="Departure City"></input>
        <input onChange={filterChange} type="text" name="landing_city" placeholder="Landing City"></input>
        <input onChange={filterChange} type="number" min="0" max="5" name="stops" placeholder="Stops"></input>
                <table className='table'>
                <thead>
                    <tr>
                        <th>Flight Number</th>
                        <th>Departure Date</th>
                        <th>Time</th>
                        <th>Departure City</th>
                        <th>Landing City</th>
                        <th>Company Name</th>
                        <th>Stops</th>
                        <th>Price</th>
                    </tr>
                </thead>
                {flights.map(flight => <Flight flight = {flight} key={flight.flight_number}/>)}
                </table>
            </div>
      </div>
    )
  }
}



// const FlightBoard = () => {
//   return (
//     <div>
//       <h4>FlightBoard</h4>
//       {/* <a href='/'>Go Back</a> */}
//       <Link to='/'>Go Back</Link>
//     </div>
//   )
// }

// export default FlightBoard