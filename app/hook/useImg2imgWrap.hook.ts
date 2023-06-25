import { useState } from "react";
import { useSelector } from "./useSelector.hook";
import { useDispatch } from "react-redux";
import { setUrl } from "../redux/Features/Img2imgState/Img2imgSlice";

export const useImg2imgWrap = ({
  url,
  port,
}: {
  url: string;
  port: string;
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [requestId, setRequestId] = useState(null);

  const dispatch = useDispatch();

  const img2imgSettings = useSelector((state) => state.img2img.settings);

  dispatch(setUrl(url));

  const img2img = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("img2imgSettings", img2imgSettings);
      const res = await fetch("api/sdwrap/img2img", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sdUrl: port ? `${url}:${port}` : url,
          args: img2imgSettings,
        }),
      });
      // console.log("res in hook", res);
      if (res.status == 200) {
        const json = await res.json();
        setResult(json);
        setRequestId(json["request_id"]);
      } else {
        const json = await res.json();
        setError(json.error);
      }
    } catch (err: any) {
      // console.log("err in hook", err);
      setError(err.message);
    }
    setLoading(false);
  };

  return { requestId, error, loading, result, img2img };
};
