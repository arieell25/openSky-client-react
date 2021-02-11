import { TextField } from '@material-ui/core';
import { useState, useEffect, React} from 'react'
import {flightService} from '../../Service/FlightService'
import { withRouter } from 'react-router-dom';
import {EventBus} from '../../Service/EventBus'
import { PersonPinCircleRounded } from '@material-ui/icons';

function _FlightForm(props) {
    const [flightObj, setFlightObj]  = useState(null)
    const [price, setPrice]  = useState('')
    const [count, setCount]  = useState(0)

    useEffect(() => {
        if(props.flightNum && count===0){
            const getFlight=(async() =>{
                const flightById=await flightService.getById(props.flightNum)
                setFlightObj(flightById)
                setPrice(flightById.price)
                setCount(count+1)
            })();
        }
    })
    const onInputChange=(event) =>{
        let name = event.target.name;
        let value = event.target.value;
        if (name === 'price'){
            setPrice(value)
        }
    }

    const onSubmit= async (event) =>{
        event.preventDefault();
        const flightForSave={
            flight_number:flightObj ? flightObj.flight_number : null,
            departure_date: flightObj.departure_date,
            time: flightObj.time,
            departure_city: flightObj.departure_city,
            landing_city: flightObj.landing_city,
            company_name: flightObj.company_name,
            stops: flightObj.stops,
            surpriseMe: flightObj.surpriseMe,
            buyer_id: flightObj.buyer_id,
            new_price: flightObj.new_price,
            price: price
        }
        await flightService.save(flightForSave)
        EventBus.emit('updated')
    }

    return (
        <div className="modal-wrapper">
            <div className="modal-content">
                <form >
                    <div>
                    <input error={ true } id="outlined-basic" label="Price" name="price" variant="outlined" defaultValue={price} onChange={onInputChange}/>
                    </div>
                    <button onClick={onSubmit}>Save</button>             
                </form>
            </div>
        </div>
    )
}

export const FlightForm = withRouter(_FlightForm)
