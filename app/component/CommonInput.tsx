import { useDispatch } from "react-redux";
import { useSelector } from "../hook/useSelector.hook";
import { setSettings as setTxt2imgSettings } from "../redux/Features/Txt2imgState/Txt2imgSlice";
import { setSettings as setImg2imgSettings } from "../redux/Features/Img2imgState/Img2imgSlice";
import { setStatus as setTxt2imgStatus } from "../redux/Features/Txt2imgState/Txt2imgSlice";
import { setStatus as setImg2imgStatus } from "../redux/Features/Img2imgState/Img2imgSlice";
import { useEffect, useState } from "react";

const samplingMethodOptions = [
  {
    name: "Euler a",
    aliases: ["k_euler_a", "k_euler_ancestral"],
    options: {},
  },
  {
    name: "Euler",
    aliases: ["k_euler"],
    options: {},
  },
  {
    name: "LMS",
    aliases: ["k_lms"],
    options: {},
  },
  {
    name: "Heun",
    aliases: ["k_heun"],
    options: {},
  },
  {
    name: "DPM2",
    aliases: ["k_dpm_2"],
    options: {
      discard_next_to_last_sigma: "True",
    },
  },
  {
    name: "DPM2 a",
    aliases: ["k_dpm_2_a"],
    options: {
      discard_next_to_last_sigma: "True",
    },
  },
  {
    name: "DPM++ 2S a",
    aliases: ["k_dpmpp_2s_a"],
    options: {},
  },
  {
    name: "DPM++ 2M",
    aliases: ["k_dpmpp_2m"],
    options: {},
  },
  {
    name: "DPM++ SDE",
    aliases: ["k_dpmpp_sde"],
    options: {},
  },
  {
    name: "DPM fast",
    aliases: ["k_dpm_fast"],
    options: {},
  },
  {
    name: "DPM adaptive",
    aliases: ["k_dpm_ad"],
    options: {},
  },
  {
    name: "LMS Karras",
    aliases: ["k_lms_ka"],
    options: {
      scheduler: "karras",
    },
  },
  {
    name: "DPM2 Karras",
    aliases: ["k_dpm_2_ka"],
    options: {
      scheduler: "karras",
      discard_next_to_last_sigma: "True",
    },
  },
  {
    name: "DPM2 a Karras",
    aliases: ["k_dpm_2_a_ka"],
    options: {
      scheduler: "karras",
      discard_next_to_last_sigma: "True",
    },
  },
  {
    name: "DPM++ 2S a Karras",
    aliases: ["k_dpmpp_2s_a_ka"],
    options: {
      scheduler: "karras",
    },
  },
  {
    name: "DPM++ 2M Karras",
    aliases: ["k_dpmpp_2m_ka"],
    options: {
      scheduler: "karras",
    },
  },
  {
    name: "DPM++ SDE Karras",
    aliases: ["k_dpmpp_sde_ka"],
    options: {
      scheduler: "karras",
    },
  },
  {
    name: "DDIM",
    aliases: [],
    options: {},
  },
  {
    name: "PLMS",
    aliases: [],
    options: {},
  },
  {
    name: "UniPC",
    aliases: [],
    options: {},
  },
];

export interface CommonSettings {
  sampler_index?: string;
  steps?: number;
  restore_faces?: boolean;
  tiling?: boolean;
  height?: number;
  width?: number;
  batch_size?: number;
  n_iter?: number;
  cfg?: number;
  denoising_strength?: number;
  seeds?: number;
}

interface CommonInputProps {
  mode: number;
  defaultSettings?: CommonSettings;
}

export const CommonInput = (props: CommonInputProps) => {
  const { mode, defaultSettings }: CommonInputProps = props;

  const txt2imgSettings = useSelector((state) => state.txt2img.settings);
  const img2imgSettings = useSelector((state) => state.img2img.settings);
  const settings = mode == 0 ? txt2imgSettings : img2imgSettings;
  const setSettings = mode == 0 ? setTxt2imgSettings : setImg2imgSettings;
  const setStatus = mode == 0 ? setTxt2imgStatus : setImg2imgStatus;
  const dispatch = useDispatch();

  const [samplingMethod, setSamplingMethod] = useState<string>(
    "Eular a" || defaultSettings?.sampler_index
  );
  const [steps, setSteps] = useState<number>(20);
  const [restoreFase, setRestoreFase] = useState<boolean>(false);
  const [tiling, setTiling] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(512);
  const [width, setWidth] = useState<number>(512);
  const [batchCount, setBatchCount] = useState<number>(1);
  const [batchSize, setBatchSize] = useState<number>(1);
  const [cfg, setCfg] = useState<number>(7);
  const [denoising, setDenoising] = useState<number>(0.7);
  const [seeds, setSeeds] = useState<number>(-1);

  useEffect(() => {
    if (defaultSettings) {
      var dispatchSettings = {};
      if (defaultSettings.sampler_index) {
        setSamplingMethod(defaultSettings.sampler_index);
        dispatchSettings = {
          ...dispatchSettings,
          sampler_index: defaultSettings.sampler_index,
        };
      }
      if (defaultSettings.steps) {
        setSteps(defaultSettings.steps);
        dispatchSettings = {
          ...dispatchSettings,
          steps: defaultSettings.steps,
        };
      }
      if (defaultSettings.restore_faces) {
        setRestoreFase(defaultSettings.restore_faces);
        dispatchSettings = {
          ...dispatchSettings,
          restore_faces: defaultSettings.restore_faces,
        };
      }
      if (defaultSettings.tiling) {
        setTiling(defaultSettings.tiling);
        dispatchSettings = {
          ...dispatchSettings,
          tiling: defaultSettings.tiling,
        };
      }
      if (defaultSettings.height) {
        setHeight(defaultSettings.height);
        dispatchSettings = {
          ...dispatchSettings,
          height: defaultSettings.height,
        };
      }
      if (defaultSettings.width) {
        setWidth(defaultSettings.width);
        dispatchSettings = {
          ...dispatchSettings,
          width: defaultSettings.width,
        };
      }
      if (defaultSettings.batch_size) {
        setBatchSize(defaultSettings.batch_size);
        dispatchSettings = {
          ...dispatchSettings,
          batch_size: defaultSettings.batch_size,
        };
      }
      if (defaultSettings.n_iter) {
        setBatchCount(defaultSettings.n_iter);
        dispatchSettings = {
          ...dispatchSettings,
          n_iter: defaultSettings.n_iter,
        };
      }
      if (defaultSettings.cfg) {
        setCfg(defaultSettings.cfg);
        dispatchSettings = { ...dispatchSettings, cfg: defaultSettings.cfg };
      }
      if (defaultSettings.denoising_strength) {
        setDenoising(defaultSettings.denoising_strength);
        dispatchSettings = {
          ...dispatchSettings,
          denoising_strength: defaultSettings.denoising_strength,
        };
      }
      if (defaultSettings.seeds) {
        setSeeds(defaultSettings.seeds);
        dispatchSettings = {
          ...dispatchSettings,
          seeds: defaultSettings.seeds,
        };
      }
      dispatch(setSettings({ ...settings, ...dispatchSettings }));
      dispatch(setStatus("common initialized"));
    }
  }, []);

  useEffect(() => {
    if (settings.height && settings.height != height) {
      setHeight(settings.height);
    }
    if (settings.width && settings.width != width) {
      setWidth(settings.width);
    }
  }, [settings]);

  return (
    <div className="flex flex-col gap-1">
      <div className="w-full">
        <div className="form-control w-full max-w-xs">
          <label>
            <span>Sampling Method</span>
          </label>
          <select
            name="samplingMethod"
            id="samplingMethod"
            value={samplingMethod}
            onChange={(e) => {
              setSamplingMethod(e.target.value);
              dispatch(
                setSettings({ ...settings, sampler_index: e.target.value })
              );
            }}
          >
            {samplingMethodOptions.map((option) => (
              <option value={option.name} key={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control w-full flex flex-row gap-1 items-center ">
          <label htmlFor="steps">
            <span>Steps </span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={steps}
            onChange={(e) => {
              setSteps(parseInt(e.target.value));
              dispatch(
                setSettings({ ...settings, steps: parseInt(e.target.value) })
              );
            }}
          />
          <input
            type="number"
            name="steps"
            id="steps"
            value={steps}
            onChange={(e) => {
              setSteps(parseInt(e.target.value));
              dispatch(
                setSettings({ ...settings, steps: parseInt(e.target.value) })
              );
            }}
          />
        </div>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <input
          type="checkbox"
          name="restoreFase"
          id="restoreFase"
          checked={restoreFase}
          onChange={(e) => {
            setRestoreFase(e.target.checked);
            dispatch(
              setSettings({ ...settings, restore_faces: e.target.checked })
            );
          }}
        />
        <label htmlFor="restoreFase">Restore Fase</label>
        <input
          type="checkbox"
          name="tiling"
          id="tiling"
          checked={tiling}
          onChange={(e) => {
            setTiling(e.target.checked);
            dispatch(setSettings({ ...settings, tiling: e.target.checked }));
          }}
        />
        <label htmlFor="tiling">Tiling</label>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <label htmlFor="height">Height</label>
        <input
          type="number"
          name="height"
          id="height"
          value={height}
          onChange={(e) => {
            setHeight(parseInt(e.target.value));
            dispatch(
              setSettings({ ...settings, height: parseInt(e.target.value) })
            );
          }}
        />
        <label htmlFor="width">Width</label>
        <input
          type="number"
          name="width"
          id="width"
          value={width}
          onChange={(e) => {
            setWidth(parseInt(e.target.value));
            dispatch(
              setSettings({ ...settings, width: parseInt(e.target.value) })
            );
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="form-control w-full flex flex-row gap-1 items-center">
          <label htmlFor="batchCount">Batch Count</label>
          <input
            type="number"
            name="batchCount"
            id="batchCount"
            min={1}
            max={4}
            value={batchCount}
            onChange={(e) => {
              setBatchCount(parseInt(e.target.value));
              dispatch(
                setSettings({
                  ...settings,
                  n_iter: parseInt(e.target.value),
                })
              );
            }}
          />
          <label htmlFor="batchSize">Batch Size</label>
          <input
            type="number"
            name="batchSize"
            id="batchSize"
            min={1}
            max={2}
            value={batchSize}
            onChange={(e) => {
              setBatchSize(parseInt(e.target.value));
              dispatch(
                setSettings({
                  ...settings,
                  batch_size: parseInt(e.target.value),
                })
              );
            }}
          />
        </div>
        <div className="form-control w-full flex flex-row gap-1 items-center">
          <label htmlFor="cfg">CFG scale</label>
          <input
            type="number"
            name="cfg"
            id="cfg"
            value={cfg}
            onChange={(e) => {
              setCfg(parseInt(e.target.value));
              dispatch(
                setSettings({
                  ...settings,
                  cfg_scale: parseInt(e.target.value),
                })
              );
            }}
          />
        </div>
        {mode == 1 && (
          <div className="form-control w-full flex flex-row gap-1 items-center">
            <label htmlFor="denoising">Denoising strength</label>
            <input
              type="number"
              name="denoising"
              id="denoising"
              value={denoising}
              onChange={(e) => {
                setDenoising(parseFloat(e.target.value));
                dispatch(
                  setSettings({
                    ...settings,
                    denoising_strength: parseFloat(e.target.value),
                  })
                );
              }}
            />
          </div>
        )}
      </div>
      <div className="form-control w-full flex flex-row gap-1 items-center">
        <label htmlFor="seeds">Seeds</label>
        <input
          type="number"
          name="seeds"
          id="seeds"
          value={seeds}
          onChange={(e) => {
            setSeeds(parseInt(e.target.value));
            dispatch(
              setSettings({
                ...settings,
                seed: parseInt(e.target.value),
              })
            );
          }}
        />
      </div>
    </div>
  );
};
