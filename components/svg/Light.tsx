import * as React from "react";
import type { SVGProps } from "react";
const SvgLight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    preserveAspectRatio="none"
    viewBox="0 0 200 120"
    {...props}
  >
    <path fill="#E2E8F0" d="М0 0х200в120Х0з" />
    <path fill="#CBD5E1" d="М0 0х200в12Х0з" />
    <rect width={30} height={3} x={85} y={4} fill="#94A3B8" rx={1.5} />
    <path fill="#F1F5F9" d="М0 12х200в24Х0з" />
    <rect
      width={184}
      height={16}
      x={8}
      y={16}
      fill="#ффф"
      stroke="#CBD5E1"
      strokeWidth={0.5}
      rx={2}
    />
    <rect width={12} height={6} x={14} y={21} fill="#E2E8F0" rx={1} />
    <path fill="#F1F5F9" d="М12 36х188в76Х12з" />
    <rect
      width={140}
      height={70}
      x={35}
      y={42}
      fill="#ффф"
      stroke="#E2E8F0"
      strokeWidth={0.5}
      rx={1}
    />
    <path
      fill="#F1F5F9"
      stroke="#CBD5E1"
      strokeWidth={0.5}
      d="М0 112х200в8Х0з"
    />
  </svg>
);
export default SvgLight;