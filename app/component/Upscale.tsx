"use client";
import { ExtraInput } from "../component/ExtraInput";
import { useExtra } from "../hook/useExtra.hook";
import { useSelector } from "../hook/useSelector.hook";
import { ImageGallery } from "./ImageGallery";

interface UpscaleProps {
  id?: string;
}

export const Upscale = (props: UpscaleProps) => {
  const { id } = props;
  const generatedResult = useSelector((state) => state.generated.results);
  const {
    images: upscaleImages,
    loading,
    error,
    extra,
  } = useExtra({
    url: process.env.NEXT_PUBLIC_API_URL || "",
    port: "7860",
  });

  const image = generatedResult.find((result) => result.id == id);

  return (
    <div className="px-10 py-20 flex flex-col gap-3">
      <h1> Extra generation </h1>
      <ExtraInput imageDefault={image ? image.image : null} />
      <button onClick={extra}>extra</button>
      {loading && <div>loading...</div>}
      {error && <div>{error}</div>}
      {upscaleImages.length > 0 && (
        <ImageGallery result={{ images: upscaleImages }} />
      )}
    </div>
  );
};
