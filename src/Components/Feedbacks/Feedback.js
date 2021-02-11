import {FeedbackForm} from './FeedbackForm'
import { useState, useEffect, React} from 'react'
import {feedbackService} from '../../Service/FeedbackService'
import {EventBus} from '../../Service/EventBus'

export default function Feedback({feedback}) {
    const [feedbackUpdate, setFeedbackUpdate] = useState(false)

    useEffect(() => {
        EventBus.on('updated', () => {
            setFeedbackUpdate(false)
      });
    })

    const updateFeedback=() =>{
        setFeedbackUpdate(true)
      }

      const deleteFeedback= async (feedbackId) =>{
        await feedbackService.remove(feedbackId)
      }

    return (
        <div className="feedback">
            <span> {feedback.published_date}</span>
            <span> {feedback.company_name}</span>
            <span>{feedback.feedback}</span>
            <span>{feedback.rating}</span>
            <div className='buttonsFeedbacks'>
            <button onClick={updateFeedback}>Update</button>
            <button onClick={()=>{deleteFeedback(feedback.id)}}>Delete</button>
            </div>
            {feedbackUpdate && <FeedbackForm feedbackId={feedback.id}/>}     
        </div>
    )
}
