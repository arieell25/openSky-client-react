import { useState, useEffect, React} from 'react'
import {feedbackService} from '../../Service/FeedbackService'
import Feedback from './Feedback'
import {FeedbackForm} from './FeedbackForm'
import {EventBus} from '../../Service/EventBus'

export default function FeedbacksBoard() {
  const [feedbacks, setFeedbacks] = useState(null)
  const [feedbackAdd, setFeedbackAdd] = useState(false)
  const [filterByCompanyName, setCompanyName] = useState("")
  const [filterByRating, setRating] = useState("")
  const [filterBy, setFilterBy] = useState({})

  useEffect(() => {
    EventBus.on('added', () => {
      setFeedbackAdd(false)
  });
    getFeedbacks()
})
  const getFeedbacks= async () =>{
    const data = await feedbackService.query(filterBy)
    setFeedbacks(data)
  }

  const addFeedback=() =>{
    setFeedbackAdd(true)
  }

  const filterChange=(event) =>{
    if (event.target.name === "company_name"){
      setCompanyName(event.target.value)
    } 
    if (event.target.name === "rating"){
      setRating(event.target.value)
    }
    const filterObject = {
      company_name: event.target.name === "company_name" ? event.target.value : filterByCompanyName,
      rating: event.target.name === "rating" ? event.target.value : filterByRating
    }
    setFilterBy(filterObject)  
  }

  if (!feedbacks) return <div>Loading...</div> 
  else{
    return (
      <div className='feedbackList'>
      <input onChange={filterChange} type="text" name="company_name" placeholder="Company Name"></input>
      <input onChange={filterChange} type="number" min="1" max="5" name="rating" placeholder="Rating"></input>
      <button onClick={addFeedback}>Add</button>
        {feedbackAdd && <FeedbackForm />}
      <div>
        {feedbacks.map(feedback => <Feedback feedback = {feedback} key={feedback.id}/>)}
      </div>
      </div>
    )
  }
}



// const FeedbackBoard = () => {
//   return (
//     <div>
//       <h4>FeedbackBoard</h4>
//       {/* <a href='/'>Go Back</a> */}
//       <Link to='/'>Go Back</Link>
//     </div>
//   )
// }

// export default FeedbackBoard