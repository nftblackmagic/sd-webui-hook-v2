"use client";

import { ImageGallery } from "./ImageGallery";

export default function Test() {
  return (
    <div>
      Test component
      <ImageGallery
        result={{
          images: [],
        }}
      />
    </div>
  );
}
