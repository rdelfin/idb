// @flow
import {createAsyncStore, delayedPromisify} from './util';

export type Os = {
  image: string,
  name: string,
  developer: string,
  release_date: string,
  version: string,
  codename?: string,
  os_kernel: string,
  os_family: string,
  supported_cpu_instruction_sets: Array<string>,
  predecessor: string,
  successor?: string,
  brands: Array<string>,
  models: Array<string>,
};

const mockData: Array<Os> = [
  {
    "image": "/static/images/ex/android_os.png",
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
  },
  {
    "image": "/static/images/ex/android_os.png",
        "name": "Google Android 7.0 (Nougat)",
        "developer": "Google",
        "release_date": "2016 Aug 23",
        "version": "Android 7.0",
        "codename": "Nougat",
        "os_kernel": "Linux",
        "os_family": "Android family",
        "supported_cpu_instruction_sets": [
            "ARM-64 (ARMv8)",
            "ARM",
            "x86",
            "x86-64"
        ],
        "predecessor": "Google Android 6.0.1 (Marshmallow)",
        "successor": "Google Android 7.1 (Nougat)",
        "brands": [
            "Samsung"
        ],
        "models": [
            "Samsung SM-G892U Galaxy S8 Active TD-LTE"
        ]
  },
  {
    "image": "/static/images/ex/ios_11_os.jpg",
        "name": "Apple iOS 11",
        "developer": "Apple",
        "release_date": "2017 Sep 19",
        "version": "iOS 11",
        "os_kernel": "Mach",
        "os_family": "iOS family",
        "supported_cpu_instruction_sets": [
            "ARM-64 (ARMv8)"
        ],
        "predecessor": "Apple iOS 10.3.3",
        "successor": "Apple iOS 11.0.1",
        "brands": [
            "Apple"
        ],
        "models": [
            "Apple iPhone 8 Plus A1897 TD-LTE 256GB (Apple iPhone 10,5)"
        ]
  }
];

export default createAsyncStore(() => fetch('/os').then(res => res.json()));
