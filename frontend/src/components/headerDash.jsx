import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // clear saved JWT
        navigate("/login"); // redirect to login
      };

    return ( 
        <div className="justify-between flex items-center p-4 border-b border-gray-300 mb-4">
            <div>
                <h1 className="text-2xl font-bold">Assignment Tracker</h1>
                <p>Welcome back, samuel mwangi</p>
            </div>
            <button  onClick={handleLogout} className="border flex justify-center border-b-emerald-950 p-2 hover:bg-cyan-200 rounded font-medium cursor-pointer"><span><LogOut  className="w-5 "/></span>Logout</button>
        </div>
     );
}
 
export default Header;