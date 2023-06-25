import { useState } from "react";

export const useOptions = ({ url, port }: { url: string; port: string }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [success, setSuccess] = useState(false);

  const setOptions = async (options: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("api/sdwrap/options", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sdUrl: port ? `${url}:${port}` : url,
          args: options,
          action: "POST",
        }),
      });
      if (res.status == 200) {
        const json = await res.json();
        setResult(json);
        setSuccess(true);
      } else {
        const json = await res.json();
        setError(json.error);
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const getOptions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("sd/options", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sdUrl: port ? `${url}:${port}` : url,
          action: "GET",
        }),
      });
      if (res.status == 200) {
        const json = await res.json();
        setResult(json);
      } else {
        const json = await res.json();
        setError(json.error);
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return { error, loading, result, success, setOptions, getOptions };
};
