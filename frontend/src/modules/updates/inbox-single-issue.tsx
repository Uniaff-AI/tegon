/** Copyright (c) 2024, Tegon, all rights reserved. **/

import type { ImperativePanelHandle } from 'react-resizable-panels';

import React from 'react';

import { LeftSide } from 'modules/issues/single-issue/left-side/left-side';
import { RightSide } from 'modules/issues/single-issue/right-side/right-side';

import { AppLayout } from 'common/layouts/app-layout';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from 'components/ui/resizable';

import { IssueStoreInit } from 'store/issue-store-provider';

import { Header } from './header';
import { NotificationsList } from './notifications-list';

export function InboxSingleIssue() {
  const ref = React.useRef<ImperativePanelHandle>(null);

  return (
    <main className="flex flex-col h-[100vh]">
      <Header />
      <div className="bg-gray-200 rounded-tl-3xl flex h-[calc(100vh_-_53px)]">
        <ResizablePanelGroup direction="horizontal" className="">
          <ResizablePanel
            maxSize={50}
            ref={ref}
            minSize={16}
            collapsible
            collapsedSize={16}
          >
            <div className="flex flex-col">
              <h2 className="text-lg pl-6 pt-6 font-medium"> Inbox </h2>
              <NotificationsList />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel collapsible collapsedSize={0}>
            <div className="flex">
              <div className="flex flex-col h-full w-full">
                <main className="grid grid-cols-4 h-full">
                  <div className="col-span-4 xl:col-span-3 flex flex-col h-[calc(100vh_-_52px)]">
                    <LeftSide />
                  </div>
                  <div className="border-l hidden flex-col xl:col-span-1 xl:flex">
                    <RightSide />
                  </div>
                </main>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}

InboxSingleIssue.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <IssueStoreInit>{page}</IssueStoreInit>
    </AppLayout>
  );
};
