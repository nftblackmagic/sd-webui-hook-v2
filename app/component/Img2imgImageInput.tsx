"use client";

import { useEffect, useState } from "react";
import ImageMaskCanvas from "./ImageMaskCanvas";
import { useSelector } from "../hook/useSelector.hook";
import { useDispatch } from "react-redux";
import { setSettings } from "../redux/Features/Img2imgState/Img2imgSlice";
import { CommonInput } from "./CommonInput";

export const Img2imgImageInput = () => {
  const dispatch = useDispatch();

  const settings = useSelector((state) => state.img2img.settings);

  const [image, setImage] = useState<string | null>(null);
  const [maskImage, setMaskImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );

  const [sizeMode, setSizeMode] = useState<0 | 1 | 2 | 3>(0);
  const [maskBlur, setMaskBlur] = useState(4);
  const [maskMode, setMaskMode] = useState<0 | 1>(0);
  const [maskedContent, setMaskedContent] = useState<0 | 1 | 2 | 3>(1);
  const [inpaintArea, setInpaintArea] = useState<boolean>(false);
  const [maskPadding, setMaskPadding] = useState<number>(32);

  const imageHandler = (image: string | null) => {
    setImage(image);
  };

  const maskImageHandler = (image: string | null) => {
    setMaskImage(image);
  };

  const imageSizeHandler = (imageSize: { width: number; height: number }) => {
    setImageSize(imageSize);
  };

  useEffect(() => {
    if (image) {
      dispatch(
        setSettings({
          ...settings,
          init_images: [image],
          height: imageSize.height,
          width: imageSize.width,
        })
      );
    }
  }, [image, imageSize]);

  useEffect(() => {
    if (maskImage) {
      dispatch(
        setSettings({
          ...settings,
          mask: maskImage,
        })
      );
    }
  }, [maskImage]);

  useEffect(() => {
    dispatch(setSettings({ ...settings, resize_mode: sizeMode }));
  }, [sizeMode]);

  useEffect(() => {
    dispatch(setSettings({ ...settings, mask_blur: maskBlur }));
  }, [maskBlur]);

  useEffect(() => {
    dispatch(setSettings({ ...settings, inpainting_mask_invert: maskMode }));
  }, [maskMode]);

  useEffect(() => {
    dispatch(setSettings({ ...settings, inpainting_fill: maskedContent }));
  }, [maskedContent]);

  useEffect(() => {
    dispatch(setSettings({ ...settings, inpaint_full_res: inpaintArea }));
  }, [inpaintArea]);

  useEffect(() => {
    dispatch(
      setSettings({ ...settings, inpaint_full_res_padding: maskPadding })
    );
  }, [maskPadding]);

  return (
    <div>
      <ImageMaskCanvas
        imageHandler={imageHandler}
        maskImageHandler={maskImageHandler}
        imageSizeHandler={imageSizeHandler}
        containCrop={false}
      />
      <div className="flex flex-row gap-2 items-center">
        <input
          type="radio"
          id="sizeMode0"
          name="Just resize"
          value={0}
          checked={sizeMode === 0}
          onChange={() => setSizeMode(0)}
        />
        <label htmlFor="sizeMode0">Just resize</label>
        <input
          type="radio"
          id="sizeMode1"
          name="Crop and resize"
          value={1}
          checked={sizeMode === 1}
          onChange={() => setSizeMode(1)}
        />
        <label htmlFor="sizeMode1">Crop and resize</label>
        <input
          type="radio"
          id="sizeMode2"
          name="Resize and fill"
          value={2}
          checked={sizeMode === 2}
          onChange={() => setSizeMode(2)}
        />
        <label htmlFor="sizeMode2">Resize and fill</label>
        <input
          type="radio"
          id="sizeMode3"
          name="Just resize(latent upscale)"
          value={3}
          checked={sizeMode === 3}
          onChange={() => setSizeMode(3)}
        />
        <label htmlFor="sizeMode3">Just resize(latent upscale)</label>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <label htmlFor="maskBlur">Mask Blur</label>
        <input
          type="number"
          value={maskBlur}
          onChange={(e) => setMaskBlur(parseInt(e.target.value))}
        />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <input
          type="radio"
          id="maskMode0"
          name="Inpaint masked
          "
          value={0}
          checked={maskMode === 0}
          onChange={() => setMaskMode(0)}
        />
        <label htmlFor="maskMode0">Inpaint masked</label>
        <input
          type="radio"
          id="maskMode1"
          name="Inpaint not masked
          "
          value={1}
          checked={maskMode === 1}
          onChange={() => setMaskMode(1)}
        />
        <label htmlFor="maskMode1">Inpaint not masked</label>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <input
          type="radio"
          id="maskedContent0"
          name="fill"
          value={0}
          checked={maskedContent === 0}
          onChange={() => setMaskedContent(0)}
        />
        <label htmlFor="maskedContent0">fill</label>
        <input
          type="radio"
          id="maskedContent1"
          name="original"
          value={1}
          checked={maskedContent === 1}
          onChange={() => setMaskedContent(1)}
        />
        <label htmlFor="maskedContent1">original</label>
        <input
          type="radio"
          id="maskedContent2"
          name="latent noise
          "
          value={2}
          checked={maskedContent === 2}
          onChange={() => setMaskedContent(2)}
        />
        <label htmlFor="maskedContent2">latent noise</label>
        <input
          type="radio"
          id="maskedContent3"
          name="latent nothing
          "
          value={3}
          checked={maskedContent === 3}
          onChange={() => setMaskedContent(3)}
        />
        <label htmlFor="maskedContent3">latent nothing</label>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <input
          type="radio"
          id="inpaintArea0"
          name="Whole picture
          "
          checked={!inpaintArea}
          onChange={() => setInpaintArea(false)}
        />
        <label htmlFor="inpaintArea0">Whole picture</label>
        <input
          type="radio"
          id="inpaintArea1"
          name="Only masked
          "
          checked={inpaintArea}
          onChange={() => setInpaintArea(true)}
        />
        <label htmlFor="inpaintArea1">Only masked</label>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <label htmlFor="maskPadding">maskPadding</label>
        <input
          type="number"
          value={maskPadding}
          onChange={(e) => setMaskPadding(parseInt(e.target.value))}
        />
      </div>
      <CommonInput mode={1} />
    </div>
  );
};
