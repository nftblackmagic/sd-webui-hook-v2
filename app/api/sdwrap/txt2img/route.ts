import { Txt2imgInterface } from "@/app/type/txt2img";
import { NextRequest } from "next/server";
import * as _ from "lodash";

export async function POST(req: NextRequest) {
  const { sdUrl, args } = await req.json();
  //   console.log("sdUrl", sdUrl, "args", args);

  if (sdUrl === null || sdUrl === undefined) {
    return new Response("No sdUrl provided.", {
      status: 500,
    });
  }

  const body: Txt2imgInterface = args;

  const controlnet = _.get(body, "alwayson_scripts.controlnet", null);

  if (controlnet !== null) {
    const image = _.get(controlnet, "args[0].input_image", null);
    // console.log("image is in controlnet");
    if (!image) {
      return new Response("No image provided.", {
        status: 500,
      });
    }
  }

  const width = _.get(body, "width", null);
  const height = _.get(body, "height", null);

  if (width == 0 || height == 0) {
    return new Response("Width or height is 0.", {
      status: 500,
    });
  }

  const txt2imgResponse = await fetch(`${sdUrl}/txt2img`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const txt2imgResponseJson = await txt2imgResponse.json();

  // console.log("txt2imgResponseJson in api", txt2imgResponseJson);

  if (txt2imgResponseJson.error) {
    return new Response(JSON.stringify(txt2imgResponseJson), {
      status: 500,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    });
  }

  return new Response(JSON.stringify(txt2imgResponseJson), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
