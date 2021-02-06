import React, {Component} from 'react';
import FeedbacksList from './FeedbacksList';
import NewFeedback from './NewFeedback';

//TODO: UPDATE
class FeedbacksBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            feedbacks: [],
            selectedFeedback:null
        }
    this.delete = this.delete.bind(this);
    this.add = this.add.bind(this);
    this.nextId = this.nextId.bind(this);
    
    this.transportSelected = this.transportSelected.bind(this);

    this.update = this.update.bind(this);
    }
    componentDidMount(){
        const that = this;
        let data = [];
        async function fetchData () {
        try {
        data = await fetch("https://opensky1234.herokuapp.com/api/feedbacks ")
        .then(res => res.json());
        } catch(err) {
        console.log(`Error while fetching data from server: ( ${err})`);
        }
        data.map(item => that.add({
            id: item.id,
            _user_id: item._user_id,
            company_name: item.company_name, 
            published_date: item.published_date,
            feedback: item.feedback,
            rating: item.rating,
        }));
    }
        fetchData ();
}

    add( {id = null,
        _user_id = 'default user id',
        company_name = 'default company name',
        published_date = 'default published date',
        rating = 'default published rating',
        feedback = 'default feedback',
    } ) {
        this.setState(prevState => ({
        feedbacks: [
            ...prevState.feedbacks, {
                id: id !== null ? id : this.nextId(prevState.feedbacks),
                _user_id:_user_id,
                company_name:company_name, 
                published_date:published_date,
                rating:rating,
                feedback:feedback
            }]
        }))
    }
    

    delete(id){
        this.setState(prevState => ({
            feedbacks: prevState.feedbacks.filter(feedback => feedback.id !== id)
        }))
    }

    update(newFeedback){
        this.setState(prevState => ({
            feedbacks: prevState.feedbacks.map(
                feedback => feedback.id !== newFeedback.id ? feedback : newFeedback
            )
        }));
    }

    nextId(feedbacks = []) {
        let max = feedbacks.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id , 0);
        return ++max;
    }
    transportSelected = (feedback) =>{
        this.setState({selectedFeedback:feedback},()=>{
        });
       
    }
    render(){
        return (
            <div>
                {/* TODO: SEARCH */}
                {/* <FlightFiltter></FlightFiltter> */}
                <FeedbacksList list={this.state.feedbacks} onDelete={this.delete} onSelectedUpdate={this.transportSelected}></FeedbacksList>
                <NewFeedback selectedFeedback={this.state.selectedFeedback} onSave={this.add} onUpdate={this.update}></NewFeedback>
            </div>
        );
    }
}
export default FeedbacksBoard;