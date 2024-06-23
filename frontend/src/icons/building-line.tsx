/** Copyright (c) 2024, Tegon, all rights reserved. **/

import type { IconProps } from './types';

export function BuildingLine({ size = 18, className, color }: IconProps) {
  return (
    <svg
      width={size}
      className={className}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.99994 4.54805C1.99994 3.13972 3.14161 1.99805 4.54994 1.99805H10.4499C11.8583 1.99805 12.9999 3.13972 12.9999 4.54804L13 7.99805L14.3999 7.99805C14.8784 7.99803 15.2824 7.99802 15.6133 8.02506C15.9598 8.05337 16.2918 8.11504 16.6076 8.27598C17.0874 8.52045 17.4775 8.91055 17.722 9.39037C17.883 9.70624 17.9446 10.0382 17.9729 10.3847C18 10.7156 18 11.1196 18 11.5981L18 15.9968C18 16.1996 18 16.3944 17.9866 16.5588C17.9719 16.7386 17.9375 16.9471 17.831 17.156C17.6824 17.4477 17.4453 17.6848 17.1537 17.8334C16.9447 17.9398 16.7363 17.9742 16.5565 17.9889C16.3921 18.0024 16.1973 18.0023 15.9945 18.0023L3.54994 18.0023C2.6939 18.0023 1.99994 17.3084 1.99994 16.4523V4.54805ZM13.0014 16.5023H15.97C16.2064 16.5023 16.3386 16.5017 16.4343 16.4939C16.4577 16.492 16.4741 16.4899 16.4847 16.4883L16.486 16.487C16.4876 16.4764 16.4897 16.4601 16.4916 16.4367C16.4994 16.3409 16.5 16.2087 16.5 15.9723L16.5 11.628C16.5 11.1116 16.4994 10.7694 16.4779 10.5069C16.4572 10.2531 16.4208 10.1405 16.3855 10.0714C16.2848 9.87379 16.1242 9.71316 15.9266 9.61249C15.8575 9.57725 15.7449 9.54081 15.4911 9.52008C15.2286 9.49863 14.8864 9.49805 14.37 9.49805H13.0014V16.5023ZM11.5 16.5023L11.4999 4.54804C11.4999 3.96815 11.0298 3.49805 10.4499 3.49805H4.54994C3.97004 3.49805 3.49994 3.96815 3.49994 4.54805V16.4523C3.49994 16.4799 3.52232 16.5023 3.54994 16.5023H11.5Z"
        fill={color ? color : 'currentColor'}
      />
      <path
        d="M5.99978 4.99805C6.41399 4.99805 6.74978 5.33383 6.74978 5.74805V6.54805C6.74978 6.96226 6.41399 7.29805 5.99978 7.29805C5.58556 7.29805 5.24978 6.96226 5.24978 6.54805V5.74805C5.24978 5.33383 5.58556 4.99805 5.99978 4.99805ZM9.00014 4.99805C9.41436 4.99805 9.75014 5.33383 9.75014 5.74805V6.54805C9.75014 6.96226 9.41436 7.29805 9.00014 7.29805C8.58593 7.29805 8.25014 6.96226 8.25014 6.54805V5.74805C8.25014 5.33383 8.58593 4.99805 9.00014 4.99805ZM5.99978 8.8501C6.41399 8.8501 6.74978 9.18588 6.74978 9.6001V10.4001C6.74978 10.8143 6.41399 11.1501 5.99978 11.1501C5.58556 11.1501 5.24978 10.8143 5.24978 10.4001V9.6001C5.24978 9.18588 5.58556 8.8501 5.99978 8.8501ZM9.00014 8.8501C9.41436 8.8501 9.75014 9.18588 9.75014 9.6001V10.4001C9.75014 10.8143 9.41436 11.1501 9.00014 11.1501C8.58593 11.1501 8.25014 10.8143 8.25014 10.4001V9.6001C8.25014 9.18588 8.58593 8.8501 9.00014 8.8501ZM5.99978 12.6997C6.41399 12.6997 6.74978 13.0355 6.74978 13.4497V14.2497C6.74978 14.6639 6.41399 14.9997 5.99978 14.9997C5.58556 14.9997 5.24978 14.6639 5.24978 14.2497V13.4497C5.24978 13.0355 5.58556 12.6997 5.99978 12.6997ZM9.00014 12.6997C9.41436 12.6997 9.75014 13.0355 9.75014 13.4497V14.2497C9.75014 14.6639 9.41436 14.9997 9.00014 14.9997C8.58593 14.9997 8.25014 14.6639 8.25014 14.2497V13.4497C8.25014 13.0355 8.58593 12.6997 9.00014 12.6997Z"
        fill={color ? color : 'currentColor'}
      />
    </svg>
  );
}
