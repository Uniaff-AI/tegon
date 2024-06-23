/** Copyright (c) 2024, Tegon, all rights reserved. **/

import type { IconProps } from './types';

export function DuplicateLine({ size = 18, className, color }: IconProps) {
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
        d="M9.72875 2.25H10.2712C11.9873 2.25 13.2694 2.55779 14.3522 3.13682C15.422 3.70311 16.2969 4.57798 16.8632 5.64782C17.4422 6.73061 17.75 8.01268 17.75 9.72875V10.2712C17.75 11.9873 17.4422 13.2694 16.8632 14.3522C16.2969 15.422 15.422 16.2969 14.3522 16.8632C13.2694 17.4422 11.9873 17.75 10.2712 17.75H9.72875C8.01268 17.75 6.73061 17.4422 5.64782 16.8632C4.57798 16.2969 3.70311 15.422 3.13682 14.3522C2.55779 13.2694 2.25 11.9873 2.25 10.2712V9.72875C2.25 8.01268 2.55779 6.73061 3.13682 5.64782C3.70341 4.57782 4.57868 3.70293 5.64893 3.13682C6.73061 2.55779 8.01268 2.25 9.72875 2.25Z"
        stroke={color ? color : 'currentColor'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.17133 7.17279C7.46422 6.8799 7.9391 6.8799 8.23199 7.17279L10 8.9408L11.7675 7.17328C12.0604 6.88039 12.5353 6.88039 12.8282 7.17328C13.1211 7.46617 13.1211 7.94105 12.8282 8.23394L11.0607 10.0015L12.8282 11.769C13.1211 12.0619 13.1211 12.5368 12.8282 12.8296C12.5353 13.1225 12.0604 13.1225 11.7675 12.8296L10 11.0621L8.23199 12.8301C7.9391 13.123 7.46422 13.123 7.17133 12.8301C6.87844 12.5372 6.87844 12.0624 7.17133 11.7695L8.93934 10.0015L7.17133 8.23346C6.87844 7.94056 6.87844 7.46569 7.17133 7.17279Z"
        fill={color ? color : 'currentColor'}
      />
    </svg>
  );
}
