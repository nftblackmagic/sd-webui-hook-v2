import { useEffect, useState } from "react";
import { useTxt2imgWrap } from "../hook/useTxt2imgWrap.hook";
import { useProgressWrap } from "../hook/useProgressWrap.hook";
import { useOptions } from "../hook/useOptions.hook";
import * as _ from "lodash";
import { useImg2imgWrap } from "../hook/useImg2imgWrap.hook";
import { DBResult } from "../type/database";

interface ImageGenerationButtonProps {
  setFinalResults: (result: any) => void;
  defaultCheckpoint: string;
  mode: number;
}

export const ImageGenerationButton = (props: ImageGenerationButtonProps) => {
  const { setFinalResults, defaultCheckpoint, mode } = props;

  const [progressBar, setProgressBar] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [reqId, setReqId] = useState<string | null>(null);
  const [checkpoint, setCheckpoint] = useState<string | null>(null);
  const [phase, setPhase] = useState<string | null>(null);
  const [loadingImages, setLoadingImages] = useState<string | null>(null);

  const {
    requestId: txt2imgRequestId,
    error: txt2imgError,
    txt2img,
  } = useTxt2imgWrap({
    url: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1",
    port: process.env.NEXT_PUBLIC_API_PORT || "5001",
  });

  const {
    requestId: img2imgRequestId,
    error: img2imgError,
    img2img,
  } = useImg2imgWrap({
    url: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1",
    port: process.env.NEXT_PUBLIC_API_PORT || "5001",
  });

  const { query, result: progressResult } = useProgressWrap({
    url: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1",
    port: process.env.NEXT_PUBLIC_API_PORT || "5001",
  });

  const {
    result: options,
    loading: optionsLoading,
    success: optionsSuccess,
    setOptions,
    getOptions,
  } = useOptions({
    url: process.env.NEXT_PUBLIC_API_URL || "http://0.0.0.0",
    port: "7860",
  });

  const handleClick = () => {
    setPhase(null);
    setProgressBar(0);
    if (checkpoint != defaultCheckpoint) {
      setCheckpoint(defaultCheckpoint);
      setPhase("Loading checkpoint...");
      setOptions({
        sd_model_checkpoint: defaultCheckpoint,
      });
    } else {
      handleGenerating();
    }
  };

  const handleGenerating = () => {
    setPhase("Sending request...");
    if (mode == 0) {
      txt2img();
    } else if (mode == 1) {
      img2img();
    }
  };

  useEffect(() => {
    if (txt2imgRequestId) {
      setReqId(txt2imgRequestId);
      query(txt2imgRequestId);
      const id = setInterval(() => {
        query(txt2imgRequestId);
      }, 1000);
      setIntervalId(id);
    }
  }, [txt2imgRequestId]);

  useEffect(() => {
    if (img2imgRequestId) {
      setReqId(img2imgRequestId);
      query(img2imgRequestId);
      const id = setInterval(() => {
        query(img2imgRequestId);
      }, 1000);
      setIntervalId(id);
    }
  }, [img2imgRequestId]);

  useEffect(() => {
    if (progressResult) {
      if (progressResult["status"]) {
        const status = progressResult["status"];
        console.log(progressResult);
        if (status == "done") {
          clearInterval(intervalId!);
          const result: DBResult = {
            info: progressResult["result"]["info"],
            type: mode == 0 ? "txt2img" : "img2img",
            images: progressResult["result"]["images"],
            parameters: JSON.stringify(progressResult["result"]["parameters"]),
          };
          setFinalResults(result);
          setPhase(null);
          setProgressBar(0);
          setLoadingImages(null);
        } else if (status == "pending") {
          setPhase(
            `Request sent. Pending... (${progressResult["pending_count"]} users ahead of you)`
          );
        } else if (status == "processing") {
          setProgressBar(progressResult["result"]["progress"]);
          setLoadingImages(progressResult["result"]["current_image"]);
          setPhase(
            `Rendering... ${Math.round(
              progressResult["result"]["progress"] * 100
            )}%`
          );
        }
      }
    }
  }, [progressResult]);

  useEffect(() => {
    if (optionsSuccess) {
      handleGenerating();
    }
  }, [optionsSuccess]);

  useEffect(() => {
    if (options) {
      const checkpoint = _.get(options, "sd_model_checkpoint", "");
      console.log(checkpoint);
      if (checkpoint) {
        setCheckpoint(checkpoint);
      }
    }
  }, [options]);

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <>
      <button onClick={handleClick} disabled={phase != null}>
        Generate Image
      </button>
      <>
        <p>{phase}</p>
        {progressBar > 0 && (
          <progress className="progress" value={progressBar} max="1" />
        )}
        {loadingImages && (
          <img src={`data:image/png;base64,${loadingImages}`} width="256" />
        )}
      </>
      {txt2imgError && <p>{txt2imgError}</p>}
      {img2imgError && <p>{img2imgError}</p>}
    </>
  );
};
