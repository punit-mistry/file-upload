import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
// import Compressor from "compressorjs";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";
export function FileUpload() {
  interface supabaseData {
    data:Array<object>;
  }
  const { toast } = useToast();
  const fileTypes: Array<string> = ["JPG", "PNG", "GIF"];
  const [file, setFile] = useState<File>();
  const [fileUrl ,setfileUrl] = useState<string>('')

  const getFileUrl = async(fileName)=>{
    const { Fileurl,error }:supabaseData = await supabase.storage
    .from("files")
    .getPublicUrl(fileName)
    // setfileUrl(setfileUrl)
    console.log(Fileurl,'file url',error)
  }

  const handleChange = async (file: File) => {
    setFile(file);
    // const compressFile = new Compressor(file, {
    //   quality: 0.4,
    //   success(result) {
    //     return result;
    //   },
    // });
    const fileName = `Radndom_${new Date()}.png`
    const { data,error }:supabaseData = await supabase.storage
      .from("files")
      .upload(fileName , file);
      
    if (data) {
      toast({ title: "Login success" });
      getFileUrl(data.fullPath)
    } else {
      toast({ variant: "destructive", title: "Failed to login !" });
    }
    console.log(data,error)
  };
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
        {/* <div >
          <FileIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-gray-100">Choose a file</span>
            or drag and drop
          </span>
          <input aria-describedby="file-upload" className="sr-only" type="file" />
        </div> */}
        <Button className="w-full">Upload</Button>
      
      </div>
      {/* <div className="w-full max-w-sm space-y-2">
        <Input aria-label="Email" placeholder="Enter your email" type="text" />
        <Button className="w-full" type="submit">
          Get Link
        </Button>
      </div> */}
    </div>
  );
}


