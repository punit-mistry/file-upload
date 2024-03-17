import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getImage } from "@/lib/utils";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { LuLoader2 } from "react-icons/lu";
const Login = () => {
  const { toast } = useToast();
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

  const handleSignUp = async () => {
    setisloading(true);
    try {
      const { data, error } = await supabase
        .from("file_upload_user")
        .insert([
          { user_name: signUpData.email, user_password: signUpData.password },
        ])
        .select();
      if (data?.length > 0) {
        toast({
          title: "Login success",
        });
        setisloading(false);
      } else {
        toast({
          title: "Failed to login !",
        });
        setisloading(false);
      }
    } catch (error) {
      toast({
        title: "Failed to login !",
      });
      setisloading(false);
    }
  };
  return (
    <div className=" bg-slate-100 h-screen w-screen flex">
      <div className="pl-[300px] pt-[250px] flex flex-col gap-4 w-1/2">
        <h1 className="font-bold  text-3xl">Sign Up</h1>
        <div className="mt-10 ml-3 flex flex-col gap-10">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
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
      <div className="relative bg-gray-300 w-1/2 max-h-screen ">
        <div className=" flex items-center justify-center pt-[100px]  ">
          <img
            src={getImage("Login", "sign-up-1.avif")}
            loading="lazy"
            className="h-[80vh] rounded-2xl"
          />
        </div>
        <div className="absolute top-[70%] text-white animate-bounce left-[250px]  w-full max-w-sm  font-extrabold text-5xl">
          Store all Information at one Place..
        </div>
      </div>
    </div>
  );
};

export default Login;
