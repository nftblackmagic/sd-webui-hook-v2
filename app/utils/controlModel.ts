type ControlNetOptions = {
  [key: string]: Object;
};

export const ControlNetModels: ControlNetOptions = {
  canny: {
    args: [
      {
        module: 'canny',
        model: 'control_v11p_sd15_canny [d14c016b]'
      }
    ]
  },
  depth: {
    args: [
      {
        module: 'depth',
        model: 'control_v11f1p_sd15_depth [cfd03158]'
      }
    ]
  },
  mlsd: {
    args: [
      {
        module: 'mlsd',
        model: 'control_v11p_sd15_mlsd [aca30ff0]'
      }
    ]
  },
  normal: {
    args: [
      {
        module: 'normal_bae',
        model: 'control_v11p_sd15_normalbae [316696f1]'
      }
    ]
  },
  lineart: {
    args: [
      {
        module: 'lineart',
        model: 'control_v11p_sd15_lineart [43d4be0d]'
      }
    ]
  },
  color: {
    args: [
      {
        module: 'color',
        model: 'control_v11p_sd15_seg [e1f51eb9]'
      }
    ]
  },
  scribble: {
    args: [
      {
        module: 'pidinet_scribble',
        model: 'control_v11p_sd15_scribble [d4ba51ff]'
      }
    ]
  },
  softedge: {
    args: [
      {
        module: 'pidinet',
        model: 'control_v11p_sd15_softedge [a8575a2a]'
      }
    ]
  },
  shuffle: {
    args: [
      {
        module: 'shuffle',
        model: 'control_v11e_sd15_shuffle [526bfdae]'
      }
    ]
  }
};
