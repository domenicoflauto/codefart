'use client';

import { useState } from 'react';
import { Message, continueConversation } from '@/app/actions';
import { readStreamableValue } from 'ai/rsc';

import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export function Chat() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  return (
    <div className='w-full max-w-[540px] m-auto gap-8'>
      <div className='flex flex-col gap-4'>
        {conversation.map((message, index) => (
          <div key={index}>
            {message.role}: {message.content}
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
            }
          }}
        >
          Send Message
        </Button>
      </div>
    </div >
  );
}