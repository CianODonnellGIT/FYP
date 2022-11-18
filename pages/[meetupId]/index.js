import MeetupDetail from '../../components/meetups/MeetupDetail'

function MeetupDetails() {
    return (
        <MeetupDetail
            image='https://www.planetware.com/photos-large/SEY/best-islands-maldives.jpg'
            title='Meeting Title'
            address='No 4A,'
            address2='The Links'
            address3='Barna'
            address4='Galway H91 NP4A'
            description='Description'
            descriptiondetail= 'This is a description to the first meetup as arranged at the address below'
            mobile= 'Tel: 0871234567'
            email='email:google@gmail.com' >
        </MeetupDetail >
    )
}

export default MeetupDetails;