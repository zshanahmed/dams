//import Disaster from '../components/Posts/Disaster/Disaster';
//import DisasterForm from '../components/Forms/Disaster/DisasterForm';

function AdminPage() {

    var loggedin = false;

    if (loggedin) {
        return(
            <div className="AdminPage">
                <h1>Logged in Admin Page</h1>
                
            </div>
        )
    } else {
        return(
            <div className="AdminPage">
                <h1>Admin Page</h1>
                
            </div>
        )
    }

}

export default AdminPage;