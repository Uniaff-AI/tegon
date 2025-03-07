import { RoleEnum } from '@tegonhq/types';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { MemberItem } from 'modules/settings/workspace-settings/members/member-item';

import type { UsersOnWorkspaceType } from 'common/types';
import { getUserFromUsersData } from 'common/user-util';

import { useCurrentTeam } from 'hooks/teams';
import { useUsersData } from 'hooks/users';

import { useContextStore } from 'store/global-context-provider';
import { UserContext } from 'store/user-context';

import { ShowMembersDropdown } from './show-members-dropdown';
import { SettingSection } from '../setting-section';

export const Members = observer(() => {
  const team = useCurrentTeam();
  const { workspaceStore } = useContextStore();
  const usersOnWorkspace = workspaceStore.usersOnWorkspaces;
  const currentUser = React.useContext(UserContext);
  const userRole = workspaceStore.getUserData(currentUser.id).role;

  const userIds = usersOnWorkspace
    .filter((uOW: UsersOnWorkspaceType) => {
      return (
        uOW.teamIds.includes(team.id) &&
        uOW.role !== RoleEnum.BOT &&
        uOW.status !== 'SUSPENDED'
      );
    })
    .map((uOW: UsersOnWorkspaceType) => uOW.userId);

  const { users, isLoading } = useUsersData(false);

  return (
    <>
      <SettingSection
        title="Участники команды"
        description={`Управляйте тем, кто является членом команды ${team.name}.`}
      >
        <div>
          {!isLoading && (
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <ShowMembersDropdown />
                <h3 className="text-xs"> {users.length} Участники </h3>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {userIds.map((userId: string, index: number) => {
                  const userData = getUserFromUsersData(users, userId);

                  if (!userData) {
                    return null;
                  }

                  return (
                    <MemberItem
                      key={userData.id}
                      id={userData.id}
                      name={userData.fullname}
                      email={userData.email}
                      isAdmin={userRole === 'ADMIN'}
                      teamId={team.id}
                      className={
                        index === users.length - 1 && 'pb-0 !border-b-0'
                      }
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </SettingSection>
    </>
  );
});
