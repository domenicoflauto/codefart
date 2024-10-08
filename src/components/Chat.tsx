'use client';

import { useState } from 'react';
import { Message, continueConversation } from '@/app/actions';
import { readStreamableValue } from 'ai/rsc';

import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Logo } from './Logo';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export function Chat() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  return (
    <div className='w-full max-w-[540px] mx-auto flex flex-col gap-4 flex-1'>
      <div className='flex flex-col gap-4 flex-1'>
        <MessageBubble role='assistant' content='Hello! How can I help you today?' />
        {conversation.map((message, index) => (
          <div key={index}>
            <MessageBubble role={message.role} content={message.content} />
          </div>
        ))}
      </div>

      <div className='w-full flex flex-col gap-2 '>
        <Textarea
          className='w-full max-w-[540px]'
          placeholder='Type your message here'
          value={input}
          onChange={event => {
            setInput(event.target.value);
          }}
        />
        <Button
          className='w-full'
          onClick={async () => {
            const { messages, newMessage } = await continueConversation([
              ...conversation,
              { role: 'user', content: input },
            ]);

            let textContent = '';

            for await (const delta of readStreamableValue(newMessage)) {
              textContent = `${textContent}${delta}`;

              setConversation([
                ...messages,
                { role: 'assistant', content: textContent },
              ]);
              setInput('');
            }
          }}
        >
          Send Message
        </Button>
      </div>
    </div >
  );
}

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

function MessageBubble({ role, content }: MessageBubbleProps) {
  if (role === 'user') {
    return (
      <div className='flex flex-row gap-2 justify-end'>
        <div className='bg-muted p-3 text-sm rounded-xl'>{content}</div>
        User
      </div>)
  } else if (role === 'assistant') {
    return (
      <div className='flex flex-row gap-2 justify-start'>
        <div>
          <Logo />
        </div>
        <div className='bg-muted p-3 text-sm rounded-xl'>{content}</div>
      </div>)
  }
}
