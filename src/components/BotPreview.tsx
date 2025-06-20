import { useState, useRef, useEffect } from 'react';
import type { Question } from '../types/question';

export function BotPreview({ questions }: { questions: Question[] }) {
  const [log, setLog] = useState<string[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  const current = questions.find((q) => q.id === currentId);

  useEffect(() => {
    if (!currentId && questions.length > 0) {
      setCurrentId(questions[0].id);
    }
  }, [questions, currentId]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const nextQuestion = (answer: string) => {
    if (!current) return;

    setLog((prev) => [...prev, `🧠 ${current.text}`, `👤 ${answer}`]);

    let nextId: string | null = null;

    if (typeof current.next === 'string') {
      nextId = current.next;
    } else if (
      typeof current.next === 'object' &&
      answer.toLowerCase() in current.next
    ) {
      nextId = current.next[answer.toLowerCase() as 'yes' | 'no'] ?? null;
    }

    const valid = questions.some((q) => q.id === nextId);
    if (!valid && nextId) {
      setLog((prev) => [...prev, `⚠️ No question with ID "${nextId}" found.`]);
    }

    setCurrentId(valid ? nextId : null);
    setInput('');
  };

  const resetPreview = () => {
    setLog([]);
    setInput('');
    setCurrentId(questions[0]?.id || null);
  };

  if (!questions.length) return null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-4 mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Bot Preview</h2>
        <button
          onClick={resetPreview}
          className="text-sm text-blue-600 underline"
        >
          Restart
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2 text-sm border p-2 rounded bg-gray-50 dark:bg-gray-700">
        {log.length === 0 ? (
          <p className="text-gray-400 italic">
            Conversation preview will appear here…
          </p>
        ) : (
          log.map((line, i) => {
            const isUser = line.startsWith('👤');
            const isError = line.startsWith('⚠️');

            return (
              <div
                key={i}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-1 rounded max-w-[80%] text-sm
                    ${
                      isError
                        ? 'text-red-500'
                        : isUser
                        ? 'bg-blue-600 text-white dark:bg-blue-500'
                        : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
                    }
                  `}
                >
                  {line}
                </div>
              </div>
            );
          })
        )}
        <div ref={logEndRef} />
      </div>

      {current ? (
        <div>
          <p className="font-medium mb-2">{current.text}</p>

          {current.type === 'yesno' ? (
            <div className="flex gap-2">
              <button
                className="px-3 py-1 rounded bg-blue-600 text-white"
                onClick={() => nextQuestion('yes')}
              >
                Yes
              </button>
              <button
                className="px-3 py-1 rounded bg-gray-600 text-white"
                onClick={() => nextQuestion('no')}
              >
                No
              </button>
            </div>
          ) : current.type === 'multiple' ? (
            <div className="flex flex-wrap gap-2">
              {current.options?.map((opt, i) => (
                <button
                  key={i}
                  className="px-3 py-1 rounded bg-blue-500 text-white"
                  onClick={() => nextQuestion(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                nextQuestion(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border p-1 flex-1 rounded bg-white dark:bg-gray-700 dark:text-white"
                placeholder="Type your answer..."
              />
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                type="submit"
              >
                Send
              </button>
            </form>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">Conversation ended.</p>
      )}
    </div>
  );
}
