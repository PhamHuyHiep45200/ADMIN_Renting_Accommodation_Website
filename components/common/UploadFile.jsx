import { uploadFile } from "@/service/upload";
import { getImage } from "@/utils/image";
import { Upload } from "antd";
import React, { useEffect, useState } from "react";

function UploadFile({ value, onChange, type }) {
  const [imageUrl, setImageUrl] = useState("");
  const handleChange = async (e) => {
    const formData = new FormData();
    formData.append("folder", "category");
    formData.append("image", e.file.originFileObj);
    const response = await uploadFile(formData);
    const url = `${response.path_image}/${response.image}`
    setImageUrl(getImage(url));
    onChange?.(getImage(url));
  };
  useEffect(() => {
    if (value) {
      setImageUrl(value);
    }
  }, [value]);
  return (
    <Upload
      name="thumnail"
      listType= {type || 'picture-circle'}
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="thumnail" className="w-full h-full rounded-full" />
      ) : (
        <span>Tải ảnh</span>
      )}
    </Upload>
  );
}

export default UploadFile;
