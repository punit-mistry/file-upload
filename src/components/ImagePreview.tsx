import { useRecoilState } from "recoil";
import { ImgLinkArray } from "@/store/index";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const ImagePreview = () => {
  const [ImgArrayLink, setImgArrayLink] = useRecoilState(ImgLinkArray);
  const [userImageLink, setImageLink] = useState([]);
  useEffect(() => {
    fetchAllImages();
  }, []);

  const fetchAllImages = async () => {
    try {
      const { data: imagesLists, error } = await supabase.storage
        .from("files")
        .list("", {
          limit: 100,
          offset: 0,
        });

      if (error) {
        throw new Error(error.message);
      }

      const userImages = imagesLists.filter(
        (res) =>
          res.name.split("==")[1] === localStorage.getItem("current_user_id")
      );
      const imageUrls = await Promise.all(
        userImages.map(async (res) => {
          const imageUrl = await getImagesUrl(res.name);
          return imageUrl;
        })
      );
      console.log(imageUrls)
      setImgArrayLink(imageUrls); // Update state with image URLs
    } catch (err) {
      console.log(err);
    }
  };

  const getImagesUrl = async (fileName) => {
    const { data } = await supabase.storage
      .from("files")
      .getPublicUrl(`${fileName}`);
    return data;
  };

  return (
    <>
      <h1 className="text-center font-bold text-2xl mb-4">Image Preview</h1>
      <div className="w-full flex flex-wrap gap-4">
        {ImgArrayLink.map((res, index) => (
          <a
            href={res?.publicUrl}
            target="_blank"
          >
            <div
              key={index}
              className="image-container hover:shadow-2xl hover:cursor-pointer p-5 flex items-center justify-center "
            >
              <img
                src={res.publicUrl}
                alt={`Image ${index}`}
                loading="lazy"
                className="image"
              />
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default ImagePreview;
