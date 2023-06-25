import { Img2imgInterface } from "@/app/type/img2img";
import * as _ from "lodash";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { sdUrl, args } = await req.json();

  if (sdUrl === null || sdUrl === undefined) {
    return new Response("No sdUrl provided.", {
      status: 500,
    });
  }

  const body: Img2imgInterface = args;

  const init_images = _.get(body, "init_images", null);
  if (!init_images || init_images.length == 0) {
    return new Response("No image provided.", {
      status: 500,
    });
  }

  const width = _.get(body, "width", null);
  const height = _.get(body, "height", null);

  if (width == 0 || height == 0) {
    return new Response("Width or height is 0.", {
      status: 500,
    });
  }

  const img2imgResponse = await fetch(`${sdUrl}/img2img`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const img2imgResponseJson = await img2imgResponse.json();

  // console.log("img2imgResponseJson in api", img2imgResponseJson);
  if (img2imgResponseJson.error) {
    return new Response(JSON.stringify(img2imgResponseJson), {
      status: 500,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    });
  }

  return new Response(JSON.stringify(img2imgResponseJson), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
