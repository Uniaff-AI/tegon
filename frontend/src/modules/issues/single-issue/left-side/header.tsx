/** Copyright (c) 2024, Tegon, all rights reserved. **/

import { RiCheckLine, RiCloseLine } from '@remixicon/react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { getTeamColor } from 'common/color-utils';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from 'components/ui/breadcrumb';
import { Button } from 'components/ui/button';
import { useCurrentTeam } from 'hooks/teams';
import { SidebarLine, TeamLine } from 'icons';

import { useContextStore } from 'store/global-context-provider';

import { IssueOptionsDropdown } from './issue-actions/issue-options-dropdown';
import { TriageAcceptModal } from '../triage-view/triage-accept-modal';
import { TriageDeclineModal } from '../triage-view/triage-decline-modal';

interface HeaderProps {
  isTriageView?: boolean;
}

export const Header = observer(({ isTriageView = false }: HeaderProps) => {
  const team = useCurrentTeam();
  const [triageAction, setTriageAction] = React.useState<
    'Accept' | 'Decline' | 'Duplicate'
  >(undefined);
  const { applicationStore } = useContextStore();

  const {
    query: { issueId, workspaceSlug },
  } = useRouter();

  const onClose = (value: boolean) => {
    if (!value) {
      setTriageAction(undefined);
    }
  };

  const chooseTriageAction = (action: 'Accept' | 'Decline' | 'Duplicate') => {
    setTriageAction(action);
  };

  return (
    <header className="flex pl-8 px-4 py-3 w-full border-b gap-2 justify-between items-center">
      <div className="flex gap-2 items-center">
        {applicationStore.displaySettings.sidebarCollapsed && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              applicationStore.updateDisplaySettings({
                sidebarCollapsed: false,
              });
            }}
          >
            <SidebarLine size={16} />
          </Button>
        )}
        <Breadcrumb className="text-xs">
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              className="flex items-center gap-2 font-medium"
              href={`/${workspaceSlug}/team/${team.identifier}/all`}
            >
              <div
                className={`p-[2px] w-5 h-5 ${getTeamColor(team.name)} rounded-sm`}
              >
                <TeamLine
                  size={14}
                  className={`shrink-0 text-muted-foreground h-4 w-4 ${getTeamColor(team.name)}`}
                />
              </div>

              <span className="inline-block">{team.name}</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              href="/docs/primitives/accordion"
              className="text-muted-foreground"
            >
              {issueId}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <IssueOptionsDropdown />
      </div>
      {isTriageView && (
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            size="xs"
            onClick={() => chooseTriageAction('Accept')}
          >
            <RiCheckLine size={14} className="mr-2" />
            Accept
          </Button>

          <Button
            variant="outline"
            size="xs"
            onClick={() => chooseTriageAction('Decline')}
          >
            <RiCloseLine size={14} className="mr-2" />
            Decline
          </Button>
        </div>
      )}

      {triageAction === 'Accept' && (
        <TriageAcceptModal setDialogOpen={onClose} />
      )}
      {triageAction === 'Decline' && (
        <TriageDeclineModal setDialogOpen={onClose} />
      )}
    </header>
  );
});
