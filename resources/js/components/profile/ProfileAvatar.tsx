import React, { useState } from "react";
import { LuFileInput } from "react-icons/lu";
import { base_url } from "../../utils/axios";


function ProfileAvatar({ avatar, self, onChange }: {
    avatar: string | null | undefined,
    self: boolean,

    onChange: (f: File) => void
}) {

    const [filePickerOpen, setFilePickerOpen] = useState(false);

    function openFilePicker() {
        setFilePickerOpen(true);
    }

    function onChangeAvatar(f: File | null) {
        if (f != null)
            onChange(f);

        setFilePickerOpen(false);
    }

    return (<div
        className={
            "bg-white absolute bottom-5 md:-bottom-20 left-1/2 border-4 border-blue-100 rounded-full container w-32 h-32"
        }
        style={{ transform: "translateX(-50%)" }}
    >
        {filePickerOpen ? <LuFileInput onChange={() => onChangeAvatar} /> : null}
        {self ? <button onClick={openFilePicker} className="container-child rounded-full flex justify-center items-center">
            +
        </button> : null}
        <img
            src={
                `${base_url}/storage/avatars/${avatar}`
            }
            className={"object-cover rounded-full w-full h-full"}
            alt={"Avatar"} />
    </div>);
}

export default ProfileAvatar;
