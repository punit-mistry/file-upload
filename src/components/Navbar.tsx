import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import NavBarUserBox from "./NavBarUserBox";
import { FaFilePowerpoint } from "react-icons/fa";
const Navbar = () => {
  const navigation = useNavigate();
  const handleRedirect = () => {
    navigation("/login");
  };
  const userName = localStorage.getItem("file_upload_user");
  return (
    <>
      <div className="bg-[#212121] text-white p-4  flex justify-between items-center ">
        <div className="font-semibold flex items-center gap-3">
          <FaFilePowerpoint />
           Easiest way to Share Files</div>
        {userName ? (
            <NavBarUserBox userName={userName}/>
        ) : ( 
          <Button onClick={handleRedirect}> Login</Button>
        )}
      </div>
    </>
  );
};

export default Navbar;
