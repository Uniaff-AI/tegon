/** Copyright (c) 2024, Tegon, all rights reserved. **/

import { useHotkeys } from 'react-hotkeys-hook';

import { useContextStore } from 'store/global-context-provider';

export function useIssuesHotKeys(
  key: string,
  setOpen: (value: boolean) => void,
  scopes: string[],
) {
  const { applicationStore } = useContextStore();

  useHotkeys(
    key,
    (e) => {
      if (
        applicationStore.selectedIssues.length > 0 ||
        applicationStore.hoverIssue
      ) {
        setOpen(true);
      }

      e.preventDefault();
    },
    { scopes },
    [applicationStore.selectedIssues, applicationStore.hoverIssue],
  );
}
