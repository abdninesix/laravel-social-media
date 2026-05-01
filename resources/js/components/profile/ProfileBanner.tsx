
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { base_url } from "../../utils/axios";

function ProfileBanner({ banner, self, onChange }: {
    banner: string | null | undefined,
    self: boolean,
    onChange: (f: File) => void
}) {

    const [filePickerOpen, setFilePickerOpen] = useState(false);

    function openFilePicker() {
        setFilePickerOpen(true);
    }

    function onChangeBanner(f: File | null) {
        if (f != null)
            onChange(f);

        setFilePickerOpen(false);
    }

    return (
        <div className={"container"}>
            {/* {filePickerOpen ? <FileInput onChange={onChangeBanner} /> : null} */}
            {self ? <button onClick={openFilePicker} className={"container-child"}>
                <div className={"mt-8 right-8 absolute bottom-8"}>
                    <BiPencil />
                </div>
            </button> : null}
            {/* <img
                src={
                    `${base_url}/storage/banners/${banner}`
                }
                className={"h-52 object-cover w-full rounded-t-md"}
                alt={"User banner"}
            /> */}
            <div className="bg-blue-500 h-52 object-cover w-full rounded-t-md"/>
        </div>
        );
}

export default ProfileBanner;
