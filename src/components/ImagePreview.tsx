import { useRecoilState } from "recoil";
import { ImgLinkArray } from "@/store/index";

const ImagePreview = () => {
    const [ImgArrayLink, setImgArrayLink] = useRecoilState(ImgLinkArray);

    console.log(ImgArrayLink);
    return (
        <div className="w-full flex gap-4">
            {ImgArrayLink.map((res, index) => (
                <div key={index}>
                    <img src={res.imgurl} alt={`Image ${index}`} loading="lazy" className=""/>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default ImagePreview;
