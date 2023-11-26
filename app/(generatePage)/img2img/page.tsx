"use client";

import { useState } from "react";
import { ImageGallery } from "../../component/ImageGallery";
import * as _ from "lodash";
import { Img2imgImageInput } from "@/app/component/Img2imgImageInput";
import { ControlNetInput } from "@/app/component/ControlNetInput";
import { PromptContainer } from "@/app/component/PromptContainer";
import { DBResult } from "@/app/type/database";
import { ImageGenerationButton } from "@/app/component/ImageGenerationButton";

export default function Img2imgPage() {
  const [result, setResult] = useState<DBResult | null>(null);

  const setFinalResults = (result: any) => {
    setResult(result);
  };

  return (
    <div className="p-10 flex flex-col gap-2 ">
      <h1>A general image to image generator</h1>
      <PromptContainer mode={1} display={true} />
      <Img2imgImageInput />
      <ControlNetInput mode={1} />
      <ImageGenerationButton
        setFinalResults={setFinalResults}
        defaultCheckpoint={"anything-v5-PrtRE.safetensors [7f96a1a9ca]"}
        mode={1}
      />
      {result && <ImageGallery result={result} />}
    </div>
  );
}
