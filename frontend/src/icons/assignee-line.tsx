/** Copyright (c) 2024, Tegon, all rights reserved. **/

import type { IconProps } from './types';

export function AssigneeLine({ size = 18, className, color }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2H7.12777C5.51749 2 4.78763 2.1378 4.04631 2.53427C3.39639 2.88185 2.88185 3.39639 2.53427 4.04631C2.1378 4.78763 2 5.51749 2 7.12777V9H3.5V7.12777C3.5 5.59677 3.63625 5.16644 3.85699 4.75371C4.06477 4.36519 4.36519 4.06477 4.75371 3.85699C5.16644 3.63625 5.59677 3.5 7.12777 3.5H9V2ZM2 12.8722V11H3.5V12.8722C3.5 14.4032 3.63625 14.8336 3.85699 15.2463C3.93972 15.401 4.03714 15.5417 4.14897 15.6682C5.57014 14.0345 7.66656 13 10.0047 13C12.3403 13 14.4347 14.0322 15.8558 15.6628C15.9656 15.5378 16.0614 15.3988 16.143 15.2463C16.3637 14.8336 16.5 14.4032 16.5 12.8722V11H18V12.8722C18 14.4825 17.8622 15.2124 17.4657 15.9537C17.1182 16.6036 16.6036 17.1182 15.9537 17.4657C15.2124 17.8622 14.4825 18 12.8722 18H7.12777C5.51749 18 4.78763 17.8622 4.04631 17.4657C3.39639 17.1182 2.88185 16.6036 2.53427 15.9537C2.1378 15.2124 2 14.4825 2 12.8722ZM18 9V7.12777C18 5.51749 17.8622 4.78763 17.4657 4.04631C17.1182 3.39639 16.6036 2.88185 15.9537 2.53427C15.2124 2.1378 14.4825 2 12.8722 2H11V3.5H12.8722C14.4032 3.5 14.8336 3.63625 15.2463 3.85699C15.6348 4.06477 15.9352 4.36519 16.143 4.75371C16.3637 5.16644 16.5 5.59677 16.5 7.12777V9H18ZM14.4975 16.4009C14.1457 16.4647 13.6516 16.5 12.8722 16.5H7.12777C6.35429 16.5 5.86175 16.4652 5.51048 16.4023C6.64828 15.2285 8.24131 14.5 10.0047 14.5C11.7674 14.5 13.3598 15.2279 14.4975 16.4009ZM10 6C8.34315 6 7 7.34315 7 9C7 10.6569 8.34315 12 10 12C11.6569 12 13 10.6569 13 9C13 7.34315 11.6569 6 10 6ZM8.5 9C8.5 8.17157 9.17157 7.5 10 7.5C10.8284 7.5 11.5 8.17157 11.5 9C11.5 9.82843 10.8284 10.5 10 10.5C9.17157 10.5 8.5 9.82843 8.5 9Z"
        fill={color ? color : 'currentColor'}
      />
    </svg>
  );
}
