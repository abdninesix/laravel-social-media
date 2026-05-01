import { RxAvatar } from "react-icons/rx";

function Avatar({ image, customClass = "w-14 h-14" }: { image: string, customClass?: string }) {

    return (
        <>
            {image.endsWith("/null") ? (
                <RxAvatar className={`${customClass} bg-white shadow-md rounded-full object-cover`} />
            ) : (
                <img src={image} className={`${customClass} bg-white shadow-md rounded-full object-cover`} />
            )}
        </>
    );
};

export default Avatar;