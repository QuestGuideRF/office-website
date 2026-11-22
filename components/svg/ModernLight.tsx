import * as React from "react";
import type { SVGProps } from "react";
const SvgModernLight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    preserveAspectRatio="none"
    viewBox="0 0 200 120"
    {...props}
  >
    <path fill="#F2F2F2" d="М0 0х200в120Х0з" />
    <path fill="#ффф" d="М0 0х200в12Х0з" />
    <rect width={30} height={4} x={85} y={4} fill="#E5E5E5" rx={2} />
    <circle cx={190} cy={6} r={3} fill="#757575" />
    <path fill="#ффф" d="М0 12х200в24Х0з" />
    <rect
      width={180}
      height={12}
      x={10}
      y={20}
      fill="#F8F9FA"
      stroke="#E5E5E5"
      strokeWidth={0.5}
      rx={3}
    />
    <rect width={15} height={4} x={15} y={24} fill="#D1D1D1" rx={1} />
    <rect width={25} height={4} x={35} y={24} fill="#D1D1D1" rx={1} />
    <rect width={10} height={4} x={65} y={24} fill="#D1D1D1" rx={1} />
    <path fill="#F2F2F2" d="М0 36х12в76Х0з" />
    <rect width={6} height={6} x={3} y={42} fill="#ААА" rx={1.5} />
    <rect width={6} height={6} x={3} y={52} fill="#ААА" rx={1.5} />
    <path fill="#ффф" stroke="#E5E5E5" strokeWidth={0.5} d="М12 36х188в6Х12з" />
    <path fill="#E0E0E0" d="М12 42х188в70Х12з" />
    <rect width={140} height={64} x={35} y={48} fill="#ффф" rx={1} />
    <rect width={60} height={2} x={45} y={58} fill="#F0F0F0" rx={1} />
    <rect width={100} height={2} x={45} y={64} fill="#F0F0F0" rx={1} />
    <rect width={80} height={2} x={45} y={70} fill="#F0F0F0" rx={1} />
    <path
      fill="#F8F9FA"
      stroke="#E5E5E5"
      strokeWidth={0.5}
      d="М0 112х200в8Х0з"
    />
  </svg>
);
export default SvgModernLight;