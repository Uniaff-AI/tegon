'use client';
import type { Editor as EditorT, Extension, Mark, Node } from '@tiptap/core';

import { EditorInstance, EditorContent, EditorBubble, useEditor } from 'novel';
import {
  ImageResizer,
  UpdatedImage,
  handleCommandNavigation,
  type SuggestionItem,
} from 'novel/extensions';
import { handleImagePaste } from 'novel/plugins';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { defaultExtensions, getPlaceholder } from './editor-extensions';
import { LinkSelector, NodeSelector, TextButtons } from './selectors';
import { slashCommand } from './slash-command';
import { uploadFn } from './utils';
import { EditorRoot, EditorCommand, EditorCommandItem } from './utils/index';
import { cn } from '../../../lib/utils';
import { CommandEmpty } from '../command';
import { Separator } from '../separator';

interface EditorExtensionsProps {
  suggestionItems: SuggestionItem[];
}

export const EditorExtensions = ({
  suggestionItems,
}: EditorExtensionsProps) => {
  const [openNode, setOpenNode] = React.useState(false);
  const [openLink, setOpenLink] = React.useState(false);

  return (
    <>
      <EditorCommand
        className={cn(
          'font-sans w-52 bg-background-2 backdrop-blur-md pl-1 shadow-1 border border-[#ffffff38] transition-all flex flex-col',
        )}
      >
        <CommandEmpty className="px-2 text-muted-foreground">
          No results
        </CommandEmpty>

        {suggestionItems.map((item: SuggestionItem) => (
          <EditorCommandItem
            value={item.title}
            onCommand={(val) => item.command(val)}
            className={`flex w-full items-center space-x-2 my-1 rounded px-2 py-1 text-left hover:bg-accent aria-selected:bg-accent hover:text-accent-foreground aria-selected:text-accent-foreground`}
            key={item.title}
          >
            <div className="flex h-4 w-4 items-center justify-center">
              {item.icon}
            </div>
            <div>
              <p>{item.title}</p>
            </div>
          </EditorCommandItem>
        ))}
      </EditorCommand>

      <EditorBubble
        tippyOptions={{
          placement: 'top',
        }}
        className="flex w-fit items-center max-w-[90vw] overflow-hidden rounded bg-background-2 shadow-1 border-[#ffffff38] p-1"
      >
        <Separator orientation="vertical" />
        <NodeSelector open={openNode} onOpenChange={setOpenNode} />
        <Separator orientation="vertical" />
        <LinkSelector open={openLink} onOpenChange={setOpenLink} />
        <Separator orientation="vertical" />
        <TextButtons />
      </EditorBubble>
    </>
  );
};

interface EditorProps {
  value?: string;
  onChange?: (value: string, valueString?: string) => void;
  autoFocus?: boolean;
  className?: string;
  editorClassName?: string;
  placeholder?: string | Extension;
  editable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onSubmit?: () => void;
  onCreate?: (editor: EditorT) => void;

  readonly children: React.ReactNode;
  extensions?: Array<Mark<any, any> | Node<any, any> | Extension<any, any>>;
}

export const Editor = ({
  value,
  onChange,
  autoFocus = false,
  className,
  editorClassName,
  placeholder,
  onFocus,
  onBlur,
  onCreate,
  onSubmit,
  children,
  extensions = [],
  editable = true,
}: EditorProps) => {
  function getInitialValue() {
    try {
      return value ? JSON.parse(value).json : undefined;
    } catch (e) {
      // Do this because sometimes you will just have text
      return value;
    }
  }

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();

      onChange &&
        onChange(
          JSON.stringify({
            json,
            text: editor.getText(),
          }),
        );
    },
    500,
  );

  const getExtensions = () => {
    const finalExtensions = [
      ...defaultExtensions,
      slashCommand,
      UpdatedImage,
      getPlaceholder(placeholder),
      ...extensions,
    ];

    return finalExtensions;
  };

  return (
    // TODO: Change this to the editor input
    <div onFocus={onFocus} onBlur={onBlur} className="relative">
      <EditorRoot>
        <EditorContent
          initialContent={getInitialValue()}
          extensions={getExtensions()}
          className={cn(
            'editor-container w-full min-w-full text-base sm:rounded-lg',
            className,
          )}
          onCreate={({ editor }) => {
            if (onCreate) {
              onCreate(editor);
            }

            autoFocus && editor.commands.focus();
          }}
          editorProps={{
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),

            handleDOMEvents: {
              keydown: (_view, event) => {
                if (event.keyCode === 13 && event.metaKey) {
                  onSubmit && onSubmit();
                  event.preventDefault();
                  return false;
                }
                return handleCommandNavigation(event);
              },
            },
            editable: () => editable,
            attributes: {
              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full ${editorClassName}`,
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
          }}
          slotAfter={<ImageResizer />}
        >
          {children}
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export type { EditorT };
export { EditorBubble, useEditor };
export type { SuggestionItem };
