import React, { ChangeEvent, FC, useState } from "react";

const ImageUpload: FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onloadend = () => {
        setSelectedImage(file);
        setBase64Image(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && <p>{selectedImage.name}</p>}
      {base64Image && <textarea readOnly value={base64Image} />}
    </div>
  );
};

export default ImageUpload;
