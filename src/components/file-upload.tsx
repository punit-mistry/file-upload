import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { LuLoader2 } from "react-icons/lu";
import { Progress } from "@/components/ui/progress";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
import ImagePreview from "./ImagePreview";
import { useRecoilState } from "recoil";
import { ImgLinkArray, userToken } from "@/store";
import { Toast } from "@radix-ui/react-toast";

export function FileUpload() {
  interface fileUrl {
    publicUrl: String;
  }
  const { toast } = useToast();
  const fileTypes: Array<string> = ["JPG", "PNG", "GIF"];
  const [File, setFile] = useState<any>();
  const [ImgArrayLink, setImgArrayLink] = useRecoilState<any>(ImgLinkArray);
  const [currentUserToken, setCurrentUserToken] =
    useRecoilState<any>(userToken);

  const [fileUrl, setfileUrl] = useState<string>("");
  const [isloading, setisloading] = useState<boolean>(false);
  const [ProgressValue, setProgressValue] = useState<number>(0);
  const [CopyLink, setCopyLink] = useState<boolean>(false);
  useEffect(() => {
    fetchUserToken();
  }, []);

  const fetchUserToken = async () => {
    try {
      let { data: userToken, error } = await supabase
        .from("file_upload_user")
        .select("user_token")
        .eq("id", localStorage.getItem("current_user_id"))
      setCurrentUserToken(userToken[0].user_token);
      if (error) {
        throw new Error(error);
      }
    } catch (err) {
      console.log(err);
      toast({ variant: "destructive", title: err.message });
    }
  };

  const updateuserToken = async (token: number) => {
    console.log(token);
    try {
      const { data, error } = await supabase
        .from("file_upload_user")
        .update({ user_token: token })
        .eq("id", localStorage.getItem("current_user_id"))
        .select();
      console.log(data);
      if (error) {
        throw new Error(error);
      }
    } catch (err) {
      console.log(err);
      toast({ variant: "destructive", title: err.message });
    }
  };

  const getFileUrl = async (fileName: any) => {
    try {
      const { data } = await supabase.storage
        .from("files")
        .getPublicUrl(fileName?.fullPath);

      // If there's no error, update the file URL
      let modifiedUrl = data?.publicUrl || "";
      if (modifiedUrl) {
        // Remove one occurrence of '/files' from the URL
        modifiedUrl = modifiedUrl.replace("/files", "");
      }
      const imgUrl = { publicUrl: modifiedUrl };
      setImgArrayLink((prevState: any) => [...prevState, imgUrl]);
      setfileUrl(modifiedUrl);
      setProgressValue(100);
      setisloading(false);
    } catch (error: any) {
      console.error("Error fetching file URL:", error.message);
      toast({ variant: "destructive", title: "Failed to fetch file URL" });
      setisloading(false);
    }
  };

  const handleChange = async (file: File) => {
    if (currentUserToken <= 0) {
      toast({
        variant: "destructive",
        title: `Attention: Token Required for Further Action`,
      });
    } else {
      setProgressValue(33);
      setTimeout(() => {
        setProgressValue(53);
      }, 500);
      setFile(file);
      setfileUrl("");
      setisloading(true);
      const fileName = uuidv4();
      const { data } = await supabase.storage
        .from("files")
        .upload(
          fileName + "==" + localStorage.getItem("current_user_id"),
          file
        );

      if (data) {
        const updateToken = currentUserToken - 10;
        setCurrentUserToken(updateToken);
        updateuserToken(updateToken);
        toast({ title: "File Uploaded !!" });
        const filePath = data;
        getFileUrl(filePath);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to Upload Try Again !",
        });
        setisloading(false);
      }
    }
  };
  const CopiedFunc = () => {
    navigator.clipboard
      .writeText(fileUrl)
      .then(() => {
        toast({ title: "Link Copied!" });
        setCopyLink(true);
        setTimeout(() => {
          setCopyLink(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error copying link: ", err);
        toast({ variant: "destructive", title: "Failed to copy link" });
      });
  };
  return (
    <>
      <div className="flex flex-col items-center space-y-4 mt-20">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Secure File Upload</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Upload any file and get a shareable link
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            classes="fileDropBg"
            label={isloading ? "Loading....." : "File Uploader"}
          />
          {isloading ? <Progress value={ProgressValue} /> : null}

          <Button className="w-full">
            {isloading ? (
              <LuLoader2 className="animate-spin text-xl" />
            ) : (
              "Upload"
            )}
          </Button>

          {fileUrl ? (
            <div className="">
              <Input
                placeholder="Your Url"
                value={fileUrl}
                type="text"
                className={
                  CopyLink
                    ? " border-green-500 border-2 shadow-2xl shadow-green-500 transition-all "
                    : ""
                }
              />
              <div className="w-full flex mt-3 gap-4">
                <Button
                  className=" w-1/2"
                  variant="link"
                >
                  <a
                    href={fileUrl}
                    target="_blank"
                  >
                    Preview
                  </a>
                </Button>
                <Button
                  className=" w-1/2"
                  onClick={CopiedFunc}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* {ImgArrayLink.length && ( */}
      <div className=" w-screen h-1/2 mt-10">
        <ImagePreview />
      </div>
      {/* )} */}
    </>
  );
}
