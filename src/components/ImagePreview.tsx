import { useRecoilState } from "recoil";
import { ImgLinkArray } from "@/store/index";

const ImagePreview = () => {
    const [ImgArrayLink, setImgArrayLink] = useRecoilState(ImgLinkArray);

    console.log(ImgArrayLink);
    return (
        <>
        <h1 className="text-center font-bold text-2xl mb-4">Image Preview</h1>
        <div className="w-full flex flex-wrap gap-4">
            {ImgArrayLink.map((res, index) => (
                    <a href={res.imgurl} target="_blank">
                <div key={index} className="image-container hover:shadow-2xl hover:cursor-pointer p-5 flex items-center justify-center ">
                    <img src={res.imgurl} alt={`Image ${index}`} loading="lazy" className="image"/>
                </div>
                    </a>
            ))}
        </div>
            </>
    );
};

export default ImagePreview;
