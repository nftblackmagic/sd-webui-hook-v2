"use client";

import { useEffect, useState } from "react";
import { useProgressWrap } from "../hook/useProgressWrap.hook";
import { useTxt2imgWrap } from "../hook/useTxt2imgWrap.hook";
import { ImageGenerationButton } from "../component/ImageGenerationButton";

export default function NoteTestPage() {
  const [reqId, setReqId] = useState<string | null>(null);

  const { requestId, loading, error, txt2img } = useTxt2imgWrap({
    url: "http://127.0.0.1",
    port: "8000",
  });

  const { result, query } = useProgressWrap({
    url: "http://127.0.0.1",
    port: "8000",
  });

  const handleTxt2imgClick = () => {
    txt2img();
  };

  const handleQueryClick = () => {
    query(reqId || "");
  };

  const handleImageGeneration = (result: any) => {
    console.log(result);
  };

  useEffect(() => {
    if (result) {
      console.log(result);
    }
  }, [result]);

  useEffect(() => {
    if (requestId) {
      console.log(requestId);
      setReqId(requestId);
    }
  }, [requestId]);

  return (
    <div>
      <h1>Test Page</h1>
      <p>requestId: {requestId}</p>
      <button onClick={handleTxt2imgClick}>Test txt2img</button>
      <button onClick={handleQueryClick}> Test progress</button>
      <ImageGenerationButton
        setFinalResults={handleImageGeneration}
        defaultCheckpoint={
          "Realistic_Vision_V2.0-fp16-no-ema.ckpt [c6fe5d4a3e]"
        }
        mode={0}
      />
    </div>
  );
}
