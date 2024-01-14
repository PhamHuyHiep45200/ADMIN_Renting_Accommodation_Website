import { uploadFile } from "@/service/upload";
import { Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import UploadFile from "./UploadFile";

function UploadMutiple({ value, onChange }) {
  const [fileList, setFileList] = useState(["", "", "", ""]);
  const [position, setPosition] = useState(0);
  const handleChangeImage = (e) => {
    const arrayImg = fileList;
    console.log(position)
    arrayImg.splice(position, 1, e);
    setFileList(arrayImg);
    onChange?.(arrayImg)
    
  };
  useEffect(() => {
    if (value) {
      setFileList(value);
    }
  }, [value]);
  return (
    <div className="flex">
      {fileList.map((e, i) => (
        <div key={i} onClick={() => setPosition(i)}>
          <UploadFile
            value={e}
            onChange={handleChangeImage}
            type="picture-card"
          />
        </div>
      ))}
    </div>
  );
}

export default UploadMutiple;
