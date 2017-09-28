// @flow

export type OperatingSystem = {
  name: string,
  developer: string,
  release_date: string,
  version: string,
  codename?: string,
  os_kernel: string,
  os_family: string,
  supported_cpu_instruction_sets: string | Array<string>,
  predecessor: string,
  successor: string,
  brands: Array<string>,
  models: Array<string>,
};


const data: Array<OperatingSystem> = [
  {
    "name": "Google Android 7.1.2 (Nougat)",
    "developer": "Google",
    "release_date": "2017 Apr 2",
    "version": "Android 7.1.2",
    "codename": "Nougat",
    "os_kernel": "Linux",
    "os_family": "Android family",
    "supported_cpu_instruction_sets": [
      "ARM-64 (ARMv8)",
      "ARM",
      "x86",
      "x86-64"
    ],
    "predecessor": "Google Android 7.1.1 (Nougat)",
    "successor": "Google Android 8.0 (Oreo)",
    "brands": [
      "LG",
      "Samsung",
      "HTC"
    ],
    "models": [
      "LG LS998 V30+ TD-LTE / AS998  (LG Joan)",
      "LG H933 V30 TD-LTE (LG Joan)",
      "LG H931 V30 TD-LTE (LG Joan)"
    ]
  }
];

export function getById(id: string | number): OperatingSystem | void {
  return data[+id];
}

export function getAll(): Array<OperatingSystem> {
  return data;
}
