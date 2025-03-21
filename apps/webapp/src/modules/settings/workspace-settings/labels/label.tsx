import { Button } from '@tegonhq/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tegonhq/ui/components/dropdown-menu';
import { DeleteLine, EditLine, MoreLine } from '@tegonhq/ui/icons';
import * as React from 'react';

import type { LabelType } from 'common/types';

import { useDeleteLabelMutation } from 'services/labels';

import { DeleteLabelAlert } from './delete-label-alert';

interface LabelProps {
  label: LabelType;
  setEditLabelState: (labelId: string) => void;
}

export function Label({ label, setEditLabelState }: LabelProps) {
  const [deleteAlert, setDeleteAlert] = React.useState(false);

  const { mutate: deleteLabelAPI } = useDeleteLabelMutation({});

  return (
    <div className="group flex justify-between mb-2 bg-background-3 rounded-lg p-2 px-4">
      <div className="flex items-center justify-center gap-3">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: label.color }}
        ></div>
        <div>{label.name}</div>
      </div>

      <div className="items-center justify-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex items-center">
            <Button variant="ghost" size="sm" className="flex items-center">
              <MoreLine size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setEditLabelState(label.id)}>
              <div className="flex items-center gap-1">
                <EditLine size={16} /> Редактировать
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteAlert(true)}>
              <div className="flex items-center gap-1">
                <DeleteLine size={16} /> Удалить
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DeleteLabelAlert
        open={deleteAlert}
        setOpen={setDeleteAlert}
        deleteLabel={() => deleteLabelAPI({ labelId: label.id })}
      />
    </div>
  );
}
