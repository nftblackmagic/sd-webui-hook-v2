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
        defaultCheckpoint={"Realistic_Vision_V2.0.ckpt [81086e2b3f]"}
        mode={1}
      />
      {result && <ImageGallery result={result} />}
    </div>
  );
}
