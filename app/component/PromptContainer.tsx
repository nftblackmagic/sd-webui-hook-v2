import { useDispatch } from "react-redux";
import { useSelector } from "../hook/useSelector.hook";
import { setSettings as setTxt2imgSettings } from "../redux/Features/Txt2imgState/Txt2imgSlice";
import { setSettings as setImg2imgSettings } from "../redux/Features/Img2imgState/Img2imgSlice";
import { setStatus as setTxt2imgStatus } from "../redux/Features/Txt2imgState/Txt2imgSlice";
import { setStatus as setImg2imgStatus } from "../redux/Features/Img2imgState/Img2imgSlice";
import { useEffect, useState } from "react";

interface PromptContainerProps {
  mode: number;
  display?: boolean | true;
  prompt_default?: string;
  negative_prompt_default?: string;
}

export const PromptContainer = (props: PromptContainerProps) => {
  const { mode, prompt_default, negative_prompt_default, display } = props;
  const [prompt, setPrompt] = useState("");
  const [negative_prompt, setNegativePrompt] = useState("");
  const txt2imgSettings = useSelector((state) => state.txt2img.settings);
  const img2imgSettings = useSelector((state) => state.img2img.settings);
  const txt2imgStatus = useSelector((state) => state.txt2img.status);
  const img2imgStatus = useSelector((state) => state.img2img.status);
  const settings = mode == 0 ? txt2imgSettings : img2imgSettings;
  const status = mode == 0 ? txt2imgStatus : img2imgStatus;
  const setSettings = mode == 0 ? setTxt2imgSettings : setImg2imgSettings;
  const setStatus = mode == 0 ? setTxt2imgStatus : setImg2imgStatus;
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setPrompt(e.target.value);
    dispatch(
      setSettings({
        ...settings,
        prompt: e.target.value + ", " + prompt_default,
      })
    );
  };

  const handleNegativeChange = (e: any) => {
    setNegativePrompt(e.target.value);
    dispatch(
      setSettings({
        ...settings,
        negative_prompt: e.target.value + ", " + negative_prompt_default,
      })
    );
  };

  useEffect(() => {
    if (status == "common initialized") {
      console.log("prompt_default", prompt_default);
      dispatch(
        setSettings({
          ...settings,
          prompt: prompt_default,
          negative_prompt: negative_prompt_default,
          styles: ["masterpiece", "high quality"],
        })
      );
      dispatch(setStatus("prompt initialized"));
    }
  }, [status]);

  return (
    <div>
      <div>
        <label htmlFor="prompt">Prompt</label>
        <textarea value={prompt} placeholder="Prompt" onChange={handleChange} />
      </div>
      {display && (
        <div>
          <label htmlFor="negative_prompt">Negative Prompt</label>
          <textarea
            value={negative_prompt}
            placeholder="Negative Prompt"
            onChange={handleNegativeChange}
          />
        </div>
      )}
    </div>
  );
};
