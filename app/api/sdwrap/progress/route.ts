import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { sdUrl, args } = await req.json();

  if (sdUrl === null || sdUrl === undefined) {
    return new Response("No sdUrl provided.", {
      status: 500,
    });
  }

  const { requestId } = args;

  const processResponse = await fetch(`${sdUrl}/progress/${requestId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const processResponseJson = await processResponse.json();

  // console.log("processResponseJson in api", processResponseJson);

  return new Response(JSON.stringify(processResponseJson), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
