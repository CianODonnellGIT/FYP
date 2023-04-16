import DoorAccessLog from '../../components/comp/DoorAccessLog'


function doorAccessPage() {
    
    function accessDoorHandler(enteredCrudpData) {

    }

    return <DoorAccessLog ondoorAccess={accessDoorHandler}/>
        
}

export default doorAccessPage