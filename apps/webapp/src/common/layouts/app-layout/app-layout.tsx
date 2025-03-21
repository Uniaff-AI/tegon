import {
  Inbox,
  MyIssues,
  Project,
  TeamLine,
} from '@tegonhq/ui/icons';
import { cn } from '@tegonhq/ui/lib/utils';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import * as React from 'react';

import { GlobalShortcuts, IssueShortcutDialogs } from 'modules/shortcuts';

import { AllProviders } from 'common/wrappers/all-providers';

import { useCurrentTeam } from 'hooks/teams';

import { useContextStore } from 'store/global-context-provider';

// import { BottomBar } from './bottom-bar';
import { Header } from './header';
import { Nav } from './nav';
import { TeamList } from './team-list';
import { useSidebarShortcut } from './use-sidebar-shortcut';
import { WorkspaceDropdown } from './workspace-dropdown';

interface LayoutProps {
  defaultCollapsed?: boolean;
  children: React.ReactNode;
}

export const AppLayoutChild = observer(({ children }: LayoutProps) => {
  const { applicationStore, notificationsStore } = useContextStore();
  useSidebarShortcut();

  const {
    query: { workspaceSlug },
  } = useRouter();
  const team = useCurrentTeam();

  return (
    <>
      <div className="h-[100vh] w-[100vw] flex">
        {!applicationStore.sidebarCollapsed && (
          <div className="w-[190px] flex flex-col h-full overflow-auto">
            <div className="flex py-3 px-4 pr-2 pt-5 items-center justify-between">
              <WorkspaceDropdown />
              <Header />
            </div>

            <div className="px-4 pr-2 mt-1 grow">
              <Nav
                links={[
                  {
                    title: 'Входящие',
                    icon: Inbox,
                    href: `/${workspaceSlug}/inbox`,
                    count: notificationsStore.unReadCount,
                  },
                  {
                    title: 'Мои задачи',
                    icon: MyIssues,
                    href: `/${workspaceSlug}/my-issues`,
                  },
                  // {
                  //   title: 'Представления',
                  //   icon: StackLine,
                  //   href: `/${workspaceSlug}/views`,
                  // },
                  {
                    title: 'Проекты',
                    icon: Project,
                    href: `/${workspaceSlug}/projects`,
                  },
                  {
                    title: 'Команды',
                    icon: TeamLine,
                    href: `/${workspaceSlug}/teams`,
                  },
                ]}
              />
              <TeamList />
            </div>
            {/*<BottomBar />*/}
          </div>
        )}

        <div
          className={cn(
            'w-full',
            applicationStore.sidebarCollapsed && 'max-w-[100vw]',
            !applicationStore.sidebarCollapsed && 'max-w-[calc(100vw_-_190px)]',
          )}
        >
          {children}
        </div>
      </div>

      <GlobalShortcuts />

      {team && <IssueShortcutDialogs />}
    </>
  );
});

export function AppLayout(props: LayoutProps) {
  return (
    <AllProviders>
      <AppLayoutChild {...props} />
    </AllProviders>
  );
}
