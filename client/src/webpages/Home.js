import Pledge from '../components/Posts/Pledge/Pledge';
import PledgeForm from '../components/Forms/Pledge/PledgeForm';

function Home() {
    return(
        <div className="Home">
            <PledgeForm />
            <Pledge />
        </div>
    )
}

export default Home;