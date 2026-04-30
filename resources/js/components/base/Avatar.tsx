import { RxAvatar } from "react-icons/rx";

function Avatar({ image, customClass = "w-14 h-14" }: { image: string, customClass?: string }) {

    return (
        <>
            {image.endsWith("/null") ? (
                <RxAvatar className={`${customClass} rounded-full border-2 border-blue-400 object-cover`} />
            ) : (
                <img src={image} className={`${customClass} rounded-full border-2 border-blue-400 object-cover`} />
            )}
        </>
    );
};

export default Avatar;