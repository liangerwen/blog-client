declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare module 'valine' {
  type avatar =
    | ''
    | 'mp'
    | 'identicon'
    | 'monsterid'
    | 'wavatar'
    | 'retro'
    | 'robohash'
    | 'hide';
  interface IOPtions {
    el: string | HTMLElement;
    appId: string;
    appKey: string;
    placeholder?: string;
    path?: string;
    avatar?: string | avatar;
    meta?: string[];
    pageSize?: number;
    lang?: string;
    visitor?: boolean;
    highlight?: boolean;
    avatarForce?: boolean;
    recordIP?: boolean;
    serverURLs?: string;
    emojiCDN?: string;
    emojiMaps?: Object;
    enableQQ?: boolean;
    requiredFields?: string[];
  }
  export default class {
    constructor(options: IOPtions);
  }
}
