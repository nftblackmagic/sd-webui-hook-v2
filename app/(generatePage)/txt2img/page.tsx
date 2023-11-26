"use client";

import { useState } from "react";
import { ImageGallery } from "../../component/ImageGallery";

import * as _ from "lodash";
import { ControlNetInput } from "@/app/component/ControlNetInput";
import { CommonInput } from "@/app/component/CommonInput";
import { PromptContainer } from "@/app/component/PromptContainer";
import { ImageGenerationButton } from "@/app/component/ImageGenerationButton";

export default function RealTxtPage() {
  const [result, setResult] = useState<any>(null);

  const setFinalResults = (result: any) => {
    setResult(result);
  };

  return (
    <div className="p-10 flex flex-col gap-2 ">
      <h1>A general text to image generator</h1>
      <PromptContainer mode={0} display={true} />
      <CommonInput mode={0} />
      <ControlNetInput mode={0} />
      <ImageGenerationButton
        setFinalResults={setFinalResults}
        defaultCheckpoint={"anything-v5-PrtRE.safetensors [7f96a1a9ca]"}
        mode={0}
      />
      {result && <ImageGallery result={result} />}
    </div>
  );
}
