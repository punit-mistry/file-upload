import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getImage } from "@/lib/utils";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { LuLoader2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData } from "@/store";

interface SignUpData {
  target: {
    name: string;
    value: string;
  };
}
interface SignUpDataType {
  email: string;
  password: string;
}

const Login = () => {
  const [currentUser, setCurrentUser] = useRecoilState<any>(userData);
  const { toast } = useToast();
  const navigation = useNavigate();
  const [signUpData, useSignUpData] = useState<SignUpDataType>({
    email: "",
    password: "",
  });
  const [isloading, setisloading] = useState<boolean>(false);
  const handleSignUpChange = ({ target }: SignUpData) => {
    const currentName = target.name;
    const currentValue = target.value;
    useSignUpData((prevState) => ({
      ...prevState,
      [currentName]: currentValue,
    }));
  };

  const checkExtistingUser = async () => {
    try {
      let { data: file_upload_user, error } = await supabase
        .from("file_upload_user")
        .select("*");
      if (error) {
        throw new Error(error.message);
      }
      const data = file_upload_user?.filter(
        (extistingUser) =>
          signUpData.email.toLowerCase() ===
            extistingUser.user_name.toLowerCase() &&
          signUpData.password.toLowerCase() ===
            extistingUser.user_password.toLowerCase()
      );
      if (data?.length) return data;
      else return false;
    } catch (err: any) {
      toast({ variant: "destructive", title: err.message });
      setisloading(false);
      return false;
    }
  };

  const handleSignUp = async () => {
    setisloading(true);
    try {
      const existingUser = await checkExtistingUser();
      if (existingUser) {
        toast({
          title: "Login success",
        });
        setCurrentUser(existingUser);
        setisloading(false);
        localStorage.setItem("file_upload_user", signUpData.email);
        localStorage.setItem("current_user_id", existingUser[0].id);
        navigation("/file-upload");
      } else {
        toast({
          variant: "destructive",
          title: "User not found Please Sign Up ",
        });
        setisloading(false);
      }
    } catch (error) {
      console.log(error);
      toast({ variant: "destructive", title: "Failed to login !" });
      setisloading(false);
    }
  };
  return (
    <div className=" bg-gradient-to-r from-cyan-100 to-gray-50  h-[92.5vh] w-full flex flex-col lg:flex-row">
      <div className="pl-[300px] pt-[250px] flex flex-col gap-4 w-1/2 shadow-2xl">
        <h1 className="font-bold  text-3xl">Log In</h1>
        <div className="mt-10 ml-3 flex flex-col gap-10">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">
              Email / UserName <span className="text-red-500"> *</span>
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={signUpData.email}
              onChange={handleSignUpChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">
              Password <span className="text-red-500"> *</span>
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={handleSignUpChange}
            />
          </div>
        </div>
        <div className="mt-10 flex px-4 gap-2">
          <Button
            className="w-[250px]"
            onClick={handleSignUp}
          >
            {isloading ? (
              <LuLoader2 className="animate-spin text-xl" />
            ) : (
              "Log In"
            )}
          </Button>
          <Button
            className="w-[250px]"
            onClick={() => navigation("/sign-up")}
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div className="relative w-1/2 max-h-[100vh] ">
        <div className=" flex items-center justify-center  bg-red-500 relative hover:-translate-y-10   transition-all hover:cursor-pointer ">
          <img
            src={getImage("Login", "sign-up-1.avif")}
            loading="lazy"
            className="absolute w-1/2 top-20 rounded-2xl"
          />
          <div className="absolute mt-[120%] text-white animate-bounce left-[28%]  w-full max-w-sm  font-extrabold text-5xl">
            Store all Images at one Place..
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
