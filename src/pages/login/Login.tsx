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
interface supabaseData {
  data: Array<object>;
}
const Login = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userData)
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
      const data = file_upload_user.filter(
        (extistingUser) =>
          signUpData.email.toLowerCase() ===
          extistingUser.user_name.toLowerCase()
      );
      if(data.length) return true
      else return false
      
    } catch (err) {
      toast({ variant: "destructive", title: err });
      setisloading(false);
      return false;
    }
  };

  const handleSignUp = async () => {
    setisloading(true);
    try {
      if (await checkExtistingUser()) {
        toast({
          variant: "destructive",
          title: "User already exists Please enter your different user name",
        });
      } else {
        if (signUpData.email && signUpData.password) {
          console.log("new user");

          const { data }: supabaseData = await supabase
            .from("file_upload_user")
            .insert([
              { user_name: signUpData.email, user_password: signUpData.password },
            ])
            .select();
          if (data?.length > 0) {
            toast({ title: "Login success" });
            console.log(data);
            setCurrentUser(data)
            setisloading(false);
            localStorage.setItem("file_upload_user", signUpData.email);
            localStorage.setItem("current_user_id", data[0].id);
            navigation("/");
          } else {
            toast({ variant: "destructive", title: "Failed to login !" });
            setisloading(false);
          }
        } else {
          setisloading(false);
          toast({
            variant: "destructive",
            title: "Please Fill the Required Fields",
          });
        }
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Failed to login !" });
      setisloading(false);
    }
  };
  return (
    <div className=" bg-slate-100  h-screen w-full flex flex-col lg:flex-row">
      <div className="pl-[300px] pt-[250px] flex flex-col gap-4 w-1/2">
        <h1 className="font-bold  text-3xl">Sign Up</h1>
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
        <div className="mt-10 flex px-4">
          <Button
            className="w-[250px]"
            onClick={handleSignUp}
          >
            {isloading ? (
              <LuLoader2 className="animate-spin text-xl" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>
      </div>
      <div className="relative bg-gray-300 w-1/2 max-h-[100vh] ">
        <div className=" flex items-center justify-center pt-[100px]  ">
          <img
            src={getImage("Login", "sign-up-1.avif")}
            loading="lazy"
            className="absolute w-1/2 top-[10%] rounded-2xl"
          />
        </div>
        <div className="absolute top-[60%] text-white animate-bounce left-[250px]  w-full max-w-sm  font-extrabold text-5xl">
          Store all Images at one Place..
        </div>
      </div>
    </div>
  );
};

export default Login;
