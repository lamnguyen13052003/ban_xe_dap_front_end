// <reference types="react-scripts" />
declare module '*.jpg';
declare module '*.png';
declare module '*.woff2';
declare module '*.woff';
declare module '*.ttf';
declare module '*.module.css';
declare module 'react-image-gallery';

declare module '*.svg' {
    import React = require('react');

    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
