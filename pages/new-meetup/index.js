// our-dimain.com/new-meetup
import NewEmployeeForm from '../../components/meetups/NewEmployeeForm'

function NewMeetupPage() {
    function addMeetupHandler(enteredMeetupData) {

    }

    return <NewEmployeeForm onAddMeetup={addMeetupHandler}/>
}

export default NewMeetupPage