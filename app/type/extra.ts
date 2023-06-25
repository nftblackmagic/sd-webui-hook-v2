export interface ExtraInterface {
  resize_mode?: number;
  show_extras_results?: boolean;
  gfpgan_visibility?: number;
  codeformer_visibility?: number;
  codeformer_weight?: number;
  upscaling_resize: number;
  upscaling_resize_w?: number;
  upscaling_resize_h?: number;
  upscaling_crop?: boolean;
  upscaler_1: string;
  upscaler_2?: string;
  extras_upscaler_2_visibility?: number;
  upscale_first?: boolean;
  image: string;
}
