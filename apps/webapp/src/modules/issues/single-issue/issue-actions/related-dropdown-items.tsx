import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from '@tegonhq/ui/components/dropdown-menu';
import {
  RelatedIssueLine,
  ParentIssueLine,
  SubIssue,
  BlockedFill,
  DuplicateLine,
  BlocksFill,
} from '@tegonhq/ui/icons';
import * as React from 'react';

import { IssueRelationEnum } from 'common/types';

import { DropdownItem } from './dropdown-item';

interface RelatedDropdownItemsProps {
  setRelatedModal: (type: IssueRelationEnum) => void;
}

export function RelatedDropdownItems({
  setRelatedModal,
}: RelatedDropdownItemsProps) {
  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <DropdownItem Icon={RelatedIssueLine} title="Добавить связанные" />
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              onClick={() => {
                setRelatedModal(IssueRelationEnum.PARENT);
              }}
            >
              <DropdownItem Icon={ParentIssueLine} title="Родительский элемент для..." />
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setRelatedModal(IssueRelationEnum.SUB_ISSUE);
              }}
            >
              <DropdownItem Icon={SubIssue} title=" Подвопрос к..." />
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setRelatedModal(IssueRelationEnum.RELATED);
              }}
            >
              <DropdownItem Icon={RelatedIssueLine} title=" Связано с..." />
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setRelatedModal(IssueRelationEnum.BLOCKED);
              }}
            >
              <DropdownItem Icon={BlockedFill} title=" Заблокировано..." />
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setRelatedModal(IssueRelationEnum.BLOCKS);
              }}
            >
              <DropdownItem Icon={BlocksFill} title="Блокирует..." />
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setRelatedModal(IssueRelationEnum.DUPLICATE_OF);
              }}
            >
              <DropdownItem Icon={DuplicateLine} title="Дубликат..." />
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </>
  );
}
