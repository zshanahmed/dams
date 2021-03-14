import Disaster from '../components/Posts/Disaster/Disaster';
import DisasterForm from '../components/Forms/Disaster/DisasterForm';

function DisasterPage() {
    return(
        <div className="DisasterPage">
            <DisasterForm />
            <Disaster />
        </div>
    )
}

export default DisasterPage;