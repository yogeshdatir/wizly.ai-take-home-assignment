import { useChatHistory } from '../hooks/useChatHistory';
import Spinner from './Spinner';

export default function ChatHistory() {
  const { messages, loading } = useChatHistory();

  if (loading)
    return (
      <div className="flex items-center justify-center h-[500px] overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4 rounded border dark:border-gray-700 space-y-4">
        <Spinner className="mx-auto" />
      </div>
    );

  return (
    <div className="h-[500px] overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4 rounded border dark:border-gray-700 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-[70%] px-4 py-2 rounded-md text-sm
            ${
              msg.sender === 'bot'
                ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white self-start'
                : 'bg-blue-600 text-white self-end ml-auto'
            }`}
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
}
