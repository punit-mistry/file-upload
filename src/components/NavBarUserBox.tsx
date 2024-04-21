import { FaUser } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
interface NavBarUserBoxProps {
    userName: string;
  }
const NavBarUserBox = ({ userName }:NavBarUserBoxProps) => {
  const navigation = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
    navigation("/");
  };
  return (
    <>
      <div className="flex items-center gap-2 hover:cursor-pointer text-black ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-3"
            >
              <FaUser />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="flex items-center gap-2">
              <TbPointFilled /> {userName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem >
              Token Left :&nbsp; <span className="font-bold"> 00</span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className="hover:cursor-pointer" onClick={handleSignOut}>
              Log Out
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default NavBarUserBox;
