import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImageMaskCanvas from "./ImageMaskCanvas";
import { useSelector } from "../hook/useSelector.hook";
import { setSettings as setTxt2imgSettings } from "../redux/Features/Txt2imgState/Txt2imgSlice";
import { setSettings as setImg2imgSettings } from "../redux/Features/Img2imgState/Img2imgSlice";

const modules = [
  "none",
  "canny",
  "depth",
  "depth_leres",
  "depth_leres++",
  "hed",
  "hed_safe",
  "mediapipe_face",
  "mlsd",
  "normal_map",
  "openpose",
  "openpose_hand",
  "openpose_face",
  "openpose_faceonly",
  "openpose_full",
  "clip_vision",
  "color",
  "pidinet",
  "pidinet_safe",
  "pidinet_sketch",
  "pidinet_scribble",
  "scribble_xdog",
  "scribble_hed",
  "segmentation",
  "threshold",
  "depth_zoe",
  "normal_bae",
  "oneformer_coco",
  "oneformer_ade20k",
  "lineart",
  "lineart_coarse",
  "lineart_anime",
  "lineart_standard",
  "shuffle",
  "tile_resample",
  "invert",
  "lineart_anime_denoise",
  "reference_only",
  "reference_adain",
  "reference_adain+attn",
  "inpaint",
  "inpaint_only",
  "inpaint_only+lama",
  "tile_colorfix",
  "tile_colorfix+sharp",
];

const models = [
  "control_v11e_sd15_ip2p_fp16 [fabb3f7d]",
  "control_v11e_sd15_shuffle_fp16 [04a71f87]",
  "control_v11f1e_sd15_tile_fp16 [3b860298]",
  "control_v11f1p_sd15_depth_fp16 [4b72d323]",
  "control_v11p_sd15_canny_fp16 [b18e0966]",
  "control_v11p_sd15_inpaint_fp16 [be8bc0ed]",
  "control_v11p_sd15_lineart_fp16 [5c23b17d]",
  "control_v11p_sd15_mlsd_fp16 [77b5ad24]",
  "control_v11p_sd15_normalbae_fp16 [592a19d8]",
  "control_v11p_sd15_openpose_fp16 [73c2b67d]",
  "control_v11p_sd15_scribble_fp16 [4e6af23e]",
  "control_v11p_sd15_seg_fp16 [ab613144]",
  "control_v11p_sd15_softedge_fp16 [f616a34f]",
  "control_v11p_sd15s2_lineart_anime_fp16 [c58f338b]",
  "t2iadapter_canny_sd14v1 [80bfd79b]",
  "t2iadapter_canny_sd15v2 [cecee02b]",
  "t2iadapter_color_sd14v1 [8522029d]",
  "t2iadapter_depth_sd14v1 [fa476002]",
  "t2iadapter_depth_sd15v2 [3489cd37]",
  "t2iadapter_keypose_sd14v1 [ba1d909a]",
  "t2iadapter_openpose_sd14v1 [7e267e5e]",
  "t2iadapter_seg_sd14v1 [6387afb5]",
  "t2iadapter_sketch_sd14v1 [e5d4b846]",
  "t2iadapter_sketch_sd15v2 [f5789421]",
  "t2iadapter_style_sd14v1 [202e85cc]",
  "t2iadapter_zoedepth_sd15v1 [44291dde]",
];

export const ControlNetInput = ({ mode }: { mode: number }) => {
  const dispatch = useDispatch();
  const txt2imgSettings = useSelector((state) => state.txt2img.settings);
  const img2imgSettings = useSelector((state) => state.img2img.settings);
  const settings = mode == 0 ? txt2imgSettings : img2imgSettings;
  const setSettings = mode == 0 ? setTxt2imgSettings : setImg2imgSettings;
  const [isEnabled, setIsEnabled] = useState(false);
  const [moduleSelected, setModuleSelected] = useState("openpose_face");
  const [modelSelected, setModelSelected] = useState(
    "control_v11p_sd15_openpose [cab727d4]"
  );
  const [image, setImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const imageHandler = (image: string | null) => {
    setImage(image);
  };

  const imageSizeHandler = (imageSize: { width: number; height: number }) => {
    setImageSize(imageSize);
  };

  useEffect(() => {
    if (isEnabled) {
      dispatch(
        setSettings({
          ...settings,
          alwayson_scripts: {
            controlnet: {
              args: [
                {
                  module: moduleSelected,
                  model: modelSelected,
                  input_image: image,
                },
              ],
            },
          },
        })
      );
    }
  }, [isEnabled, moduleSelected, modelSelected, image]);

  useEffect(() => {
    if (imageSize.width > 0 && imageSize.height > 0) {
      console.log("imageSize", imageSize);
      dispatch(
        setSettings({
          ...settings,
          width: imageSize.width,
          height: imageSize.height,
        })
      );
    }
  }, [imageSize]);

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex flex-row gap-2 items-center">
        ControlNetInput component:
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={() => setIsEnabled(!isEnabled)}
        />
      </div>
      {isEnabled && (
        <>
          <select
            value={moduleSelected}
            onChange={(e) => setModuleSelected(e.target.value)}
          >
            {modules.map((module) => (
              <option key={module} value={module}>
                {module}
              </option>
            ))}
          </select>

          <select
            value={modelSelected}
            onChange={(e) => setModelSelected(e.target.value)}
          >
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          <ImageMaskCanvas
            imageHandler={imageHandler}
            imageSizeHandler={imageSizeHandler}
          />
        </>
      )}
    </div>
  );
};
