import * as React from "react";
import type { SVGProps } from "react";
const SvgClassicLight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    preserveAspectRatio="none"
    viewBox="0 0 200 120"
    {...props}
  >
    <path fill="#E8EBEE" d="М0 0х200в120Х0з" />
    <path fill="#446995" d="М0 0х200в15Х0з" />
    <rect
      width={30}
      height={3}
      x={85}
      y={6}
      fill="#ффф"
      fillOpacity={0.8}
      rx={1.5}
    />
    <path fill="#F3F3F3" d="М12 15х25в12Х12з" />
    <path fill="transparent" d="М42 15х25в12Х42з" />
    <path
      fill="#F3F3F3"
      stroke="#D1D1D1"
      strokeWidth={0.5}
      d="М0 27х200в20Х0з"
    />
    <rect width={40} height={4} x={10} y={32} fill="#D1D1D1" rx={1} />
    <rect width={60} height={4} x={10} y={39} fill="#E5E5E5" rx={1} />
    <rect
      width={50}
      height={10}
      x={140}
      y={32}
      fill="#ффф"
      stroke="#D1D1D1"
      strokeWidth={0.5}
      rx={1}
    />
    <path fill="#E8EBEE" d="М0 47х12в65Х0з" />
    <rect width={6} height={6} x={3} y={52} fill="#99ABB9" rx={1} />
    <path fill="#D6DBE2" d="М12 47х188в65Х12з" />
    <rect width={140} height={68} x={35} y={52} fill="#ффф" rx={1} />
    <path
      fill="#F3F3F3"
      stroke="#D1D1D1"
      strokeWidth={0.5}
      d="М0 112х200в8Х0з"
    />
  </svg>
);
export default SvgClassicLight;