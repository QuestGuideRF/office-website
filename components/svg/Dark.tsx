import * as React from "react";
import type { SVGProps } from "react";
const SvgDark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    preserveAspectRatio="none"
    viewBox="0 0 200 120"
    {...props}
  >
    <path fill="#2B2B2B" d="М0 0х200в120Х0з" />
    <path fill="#3А3А3А" d="М0 0х200в12Х0з" />
    <rect width={30} height={3} x={85} y={4} fill="#555" rx={1.5} />
    <path fill="#444" d="М0 12х200в24Х0з" />
    <rect
      width={184}
      height={16}
      x={8}
      y={16}
      fill="#3А3А3А"
      stroke="#555"
      strokeWidth={0.5}
      rx={2}
    />
    <path fill="#2B2B2B" d="М12 36х188в76Х12з" />
    <rect width={140} height={70} x={35} y={42} fill="#ффф" rx={1} />
    <path fill="#3А3А3А" stroke="#555" strokeWidth={0.5} d="М0 112х200в8Х0з" />
  </svg>
);
export default SvgDark;