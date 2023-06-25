import { ExtraInterface } from "@/app/type/extra";
import * as _ from "lodash";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { sdUrl, args } = await req.json();

  if (sdUrl === null || sdUrl === undefined) {
    return new Response("No sdUrl provided.", {
      status: 500,
    });
  }

  const body: ExtraInterface = args;

  // console.log("body in api ExtraInterface", body, sdUrl);

  const extraResponse = await fetch(`${sdUrl}/sdapi/v1/extra-single-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const extraResponseJson = await extraResponse.json();

  // console.log("extraResponseJson in api", extraResponseJson);

  return new Response(JSON.stringify(extraResponseJson), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
