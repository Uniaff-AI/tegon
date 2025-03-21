import { UserTypeEnum } from '@tegonhq/types';
import { ScrollArea } from '@tegonhq/ui/components/scroll-area';
import { cn } from '@tegonhq/ui/lib/utils';
import { observer } from 'mobx-react-lite';
import getConfig from 'next/config';
import React from 'react';

import type { ConversationHistoryType } from 'common/types';

import { useConversationHistory } from 'hooks/conversations';
import { useCurrentWorkspace } from 'hooks/workspace';

import {
  useCreateConversationHistoryMutation,
  useCreateConversationMutation,
  useStreamConversationMutation,
} from 'services/conversations';

import { useContextStore } from 'store/global-context-provider';
import { UserContext } from 'store/user-context';

import { ConversationItem } from './conversation-item';
import { ConversationTextarea } from './conversation-textarea';

const { publicRuntimeConfig } = getConfig();

export const Conversation = observer(() => {
  const { commonStore } = useContextStore();

  const conversationHistory = useConversationHistory(
    commonStore.currentConversationId,
  );
  const workspace = useCurrentWorkspace();
  const user = React.useContext(UserContext);
  const {
    mutate: streamConversation,
    isLoading,
    thoughts,
  } = useStreamConversationMutation({
    baseHost: publicRuntimeConfig.NEXT_PUBLIC_AI_HOST,
  });
  const { mutate: createConversationHistory } =
    useCreateConversationHistoryMutation({});
  const { mutate: createConversation } = useCreateConversationMutation({});
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversationHistory.length]);

  const onSend = (text: string) => {
    if (commonStore.currentConversationId) {
      createConversationHistory(
        {
          message: text,
          userType: UserTypeEnum.User,
          userId: user.id,
          conversationId: commonStore.currentConversationId,
        },
        {
          onSuccess: (data) => {
            streamConversation({
              conversationId: commonStore.currentConversationId,
              conversationHistoryId: data.id,
              workspaceId: workspace.id,
            });
          },
        },
      );
    } else {
      createConversation(
        {
          message: text,
          userType: UserTypeEnum.User,
        },
        {
          onSuccess: (data) => {
            commonStore.update({ currentConversationId: data.id });
            streamConversation({
              conversationId: data.id,
              conversationHistoryId: data.ConversationHistory[0].id,
              workspaceId: workspace.id,
            });
          },
        },
      );
    }
  };

  const lastThought = thoughts[thoughts.length - 1];

  return (
    <div className="flex flex-col h-full justify-end overflow-hidden">
      <ScrollArea ref={scrollRef}>
        {conversationHistory.map(
          (conversationHistory: ConversationHistoryType, index: number) => (
            <ConversationItem
              key={index}
              conversationHistory={conversationHistory}
            />
          ),
        )}
        {isLoading && lastThought && (
          <div className="flex flex-wrap p-3 gap-1">
            <div
              className={cn('px-4 py-2 w-full flex flex-col items-start gap-1')}
            >
              AI is thinking...
              <p
                className="text-sm text-muted-foreground flex flex-wrap"
                dangerouslySetInnerHTML={{ __html: lastThought.message }}
              />
            </div>
          </div>
        )}
      </ScrollArea>
      <ConversationTextarea onSend={onSend} />
    </div>
  );
});
