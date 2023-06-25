import { useEffect, useState } from "react";
import ImageMaskCanvas from "./ImageMaskCanvas";
import { useSelector } from "../hook/useSelector.hook";
import { useDispatch } from "react-redux";
import { setSettings } from "../redux/Features/ExtraState/ExtraSlice";

const upscalerOptions = [
  {
    name: "None",
    model_name: null,
    model_path: null,
    model_url: null,
    scale: 4,
  },
  {
    name: "Lanczos",
    model_name: null,
    model_path: null,
    model_url: null,
    scale: 4,
  },
  {
    name: "Nearest",
    model_name: null,
    model_path: null,
    model_url: null,
    scale: 4,
  },
  {
    name: "ESRGAN_4x",
    model_name: "ESRGAN_4x",
    model_path:
      "https://github.com/cszn/KAIR/releases/download/v1.0/ESRGAN.pth",
    model_url: null,
    scale: 4,
  },
  {
    name: "R-ESRGAN 4x+",
    model_name: null,
    model_path:
      "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth",
    model_url: null,
    scale: 4,
  },
  {
    name: "R-ESRGAN 4x+ Anime6B",
    model_name: null,
    model_path:
      "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.2.4/RealESRGAN_x4plus_anime_6B.pth",
    model_url: null,
    scale: 4,
  },
];

export const ExtraInput = ({
  imageDefault,
}: {
  imageDefault: string | null;
}) => {
  const [image, setImage] = useState<string | null>(imageDefault);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>(
    { width: 512, height: 512 }
  );
  const [resize, setResize] = useState<1 | 2 | 4>(2);
  const [upscaler1, setUpscaler1] = useState("R-ESRGAN 4x+");
  const [upscaler2, setUpscaler2] = useState("None");

  const settings = useSelector((state) => state.extra.settings);

  const dispatch = useDispatch();

  const imageHandler = (
    image: string | null,
    width?: number,
    height?: number
  ) => {
    setImage(image);
    dispatch(
      setSettings({
        ...settings,
        image: image,
        height: height || 512,
        width: width || 512,
      })
    );
  };
  const imageSizeHandler = (imageSize: { width: number; height: number }) => {
    setImageSize(imageSize);
  };

  useEffect(() => {
    if (resize) {
      dispatch(
        setSettings({
          ...settings,
          upscaling_resize: resize,
        })
      );
    }
  }, [resize]);

  useEffect(() => {
    if (upscaler1) {
      dispatch(
        setSettings({
          ...settings,
          upscaler_1: upscaler1,
        })
      );
    }
  }, [upscaler1]);

  return (
    <div className="flex flex-col gap-2">
      <ImageMaskCanvas
        imageHandler={imageHandler}
        imageSizeHandler={imageSizeHandler}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <label>Upscale</label>
          <input
            type="radio"
            name="resize"
            value="1"
            onChange={() => setResize(1)}
            checked={resize === 1}
          />
          <label>1x</label>
          <input
            type="radio"
            name="resize"
            value="2"
            onChange={() => setResize(2)}
            checked={resize === 2}
          />
          <label>2x</label>
          <input
            type="radio"
            name="resize"
            value="4"
            onChange={() => setResize(4)}
            checked={resize === 4}
          />
          <label>4x</label>
        </div>
      </div>
      <div>
        <label>Upscaler 1</label>
        <select
          value={upscaler1}
          onChange={(e) => setUpscaler1(e.target.value)}
        >
          {upscalerOptions.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
