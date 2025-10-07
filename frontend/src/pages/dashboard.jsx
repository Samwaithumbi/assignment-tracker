import Assignments from "../components/assignments";
import Header from "../components/headerDash";
import StatsAssignment from "../components/statsAssignment";

const Dashboard = () => {
    return (  
        <div>
            <Header/>
            <StatsAssignment/>
            <div>
            <Assignments/>
            </div>
            
        </div>
    );
}
 
export default Dashboard;