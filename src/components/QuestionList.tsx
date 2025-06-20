import type { Question } from '../types/question';

type Props = {
  questions: Question[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  onClear: () => void;
};

export default function QuestionList({
  questions,
  onEdit,
  onDelete,
  onSave,
  onClear,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Questions</h2>
        <div className="flex gap-2">
          <button onClick={onSave} className="text-sm underline text-blue-600">
            Save
          </button>
          <button onClick={onClear} className="text-sm underline text-red-600">
            Clear
          </button>
        </div>
      </div>

      {questions.map((q) => (
        <div
          key={q.id}
          className="border rounded p-4 bg-white dark:bg-gray-800"
        >
          <p className="font-medium">
            {q.id}: {q.text}
          </p>
          <p className="text-sm text-gray-500">Type: {q.type}</p>

          {q.type === 'multiple' && (
            <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
              {q.options?.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
          )}

          <p className="text-sm text-gray-500">
            Next:{' '}
            {q.type === 'yesno' && typeof q.next === 'object'
              ? `Yes → ${q.next.yes || '-'}, No → ${q.next.no || '-'}`
              : typeof q.next === 'string'
              ? q.next || '-'
              : '-'}
          </p>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onEdit(q.id)}
              className="text-sm text-blue-600 underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(q.id)}
              className="text-sm text-red-600 underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
