import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
// import Compressor from "compressorjs";
import { LuLoader2 } from "react-icons/lu";
// import shortener from "../../node_modules/shortmyurl";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";
export function FileUpload() {
  interface supabaseData {
    data: Array<object>;
  }
  interface fileUrl {
    publicUrl:String
  }
  const { toast } = useToast();
  const fileTypes: Array<string> = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState<File>();
  const [fileUrl, setfileUrl] = useState<string>("");
  const [isloading, setisloading] = useState<boolean>(false);
  const [CopyLink, setCopyLink] = useState<boolean>(false);
  const getFileUrl = async (fileName:String) => {
    try {
      const { data:fileUrl, error:String }: supabaseData = await supabase.storage
        .from("files")
        .getPublicUrl(fileName);

      if (error) {
        console.error("Error fetching file URL:", error.message);
        toast({ variant: "destructive", title: "Failed to fetch file URL" });
        setisloading(false);
      } else {
        // If there's no error, update the file URL
        let modifiedUrl = data?.publicUrl || "";
        if (modifiedUrl) {
          // Remove one occurrence of '/files' from the URL
          modifiedUrl = modifiedUrl.replace("/files", "");
        }
        setfileUrl(modifiedUrl);
        setisloading(false);
      }
    } catch (error) {
      console.error("Error fetching file URL:", error.message);
      toast({ variant: "destructive", title: "Failed to fetch file URL" });
      setisloading(false);
    }
  };

  const handleChange = async (file: File) => {
    setFile(file);
    setfileUrl("");
    setisloading(true);
    const fileName = uuidv4();
    const { data, error }: supabaseData = await supabase.storage
      .from("files")
      .upload(fileName, file);

    if (data) {
      toast({ title: "File Uploaded !!" });
      getFileUrl(data.fullPath);
    } else {
      toast({ variant: "destructive", title: "Failed to Upload Try Again !" });
      setisloading(false);
    }
  };
  const CopiedFunc =()=>{
    navigator.clipboard.writeText(fileUrl)
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
  }
  return (
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
        />

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
              className={CopyLink ?' border-green-500 border-2 shadow-2xl shadow-green-500 transition-all ' :''}
            />
            <div className="w-full flex mt-3 gap-4">
              <Button className=" w-1/2" variant="link">
                <a href={fileUrl} target="_blank" >Preview</a>
                </Button>
              <Button className=" w-1/2" onClick={CopiedFunc} >Copy Link</Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
