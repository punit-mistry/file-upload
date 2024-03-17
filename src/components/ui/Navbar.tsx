import { Button } from "./button";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigation = useNavigate();
    const handleRedirect= ()=>{
        navigation('/login');
    }
  return (
    <>
      <div className="bg-[#212121] text-white p-4  flex justify-between items-center ">
        <div className="font-semibold"> Easiest way to Share Files</div>
        <Button onClick={handleRedirect}> Login</Button>
      </div>
    </>
  );
};

export default Navbar;
