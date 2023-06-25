import { useState } from "react";

export const useProgressWrap = ({
  url,
  port,
}: {
  url: string;
  port: string;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const query = async (requestId: string) => {
    setLoading(true);
    setError(null);
    if (!requestId) {
      setError("requestId is null");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("api/sdwrap/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sdUrl: port ? `${url}:${port}` : url,
          args: {
            requestId,
          },
        }),
      });
      const json = await res.json();
      if (json["status"]) {
        setStatus(json["status"]);
      }
      setResult(json);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return { error, loading, result, image, query };
};
