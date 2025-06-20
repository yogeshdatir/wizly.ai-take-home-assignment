import type { Question, QuestionType } from '../types/question';

type NewQuestion = {
  text?: string;
  type?: QuestionType;
  options?: string[];
  next?: string | Record<'yes' | 'no', string>;
};

type Props = {
  editingId: string | null;
  newQuestion: NewQuestion;
  existingIds: string[];
  onChange: (q: NewQuestion) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export default function QuestionForm({
  editingId,
  newQuestion,
  existingIds,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">
        {editingId ? `Edit Question (${editingId})` : 'Add Question'}
      </h2>

      <input
        type="text"
        placeholder="Question text"
        className="w-full p-2 border rounded"
        value={newQuestion.text || ''}
        onChange={(e) => onChange({ ...newQuestion, text: e.target.value })}
      />

      <select
        className="w-full p-2 border rounded"
        value={newQuestion.type}
        onChange={(e) =>
          onChange({ ...newQuestion, type: e.target.value as Question['type'] })
        }
      >
        <option value="text">Text</option>
        <option value="yesno">Yes/No</option>
        <option value="multiple">Multiple Choice</option>
      </select>

      {newQuestion.type === 'multiple' && (
        <textarea
          rows={2}
          placeholder="Comma-separated options"
          className="w-full p-2 border rounded"
          value={(newQuestion.options || []).join(', ')}
          onChange={(e) =>
            onChange({
              ...newQuestion,
              options: e.target.value.split(',').map((o) => o.trim()),
            })
          }
        />
      )}

      {newQuestion.type === 'yesno' ? (
        <div className="flex gap-2 bg-white dark:bg-gray-800 text-black dark:text-white">
          <select
            className="w-1/2 p-2 border rounded"
            value={
              typeof newQuestion.next === 'object'
                ? newQuestion.next?.yes ?? ''
                : ''
            }
            onChange={(e) =>
              onChange({
                ...newQuestion,
                next: {
                  yes: e.target.value,
                  no:
                    typeof newQuestion.next === 'object' &&
                    typeof newQuestion.next.no === 'string'
                      ? newQuestion.next.no
                      : '',
                } as Record<'yes' | 'no', string>,
              })
            }
          >
            <option value="">-- Next if Yes --</option>
            {existingIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
          <select
            className="w-1/2 p-2 border rounded"
            value={
              typeof newQuestion.next === 'object'
                ? newQuestion.next?.no ?? ''
                : ''
            }
            onChange={(e) =>
              onChange({
                ...newQuestion,
                next: {
                  yes:
                    typeof newQuestion.next === 'object' &&
                    typeof newQuestion.next.yes === 'string'
                      ? newQuestion.next.yes
                      : '',
                  no: e.target.value,
                } as Record<'yes' | 'no', string>,
              })
            }
          >
            <option value="">-- Next if No --</option>
            {existingIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <select
          className="w-full p-2 border rounded"
          value={typeof newQuestion.next === 'string' ? newQuestion.next : ''}
          onChange={(e) => onChange({ ...newQuestion, next: e.target.value })}
        >
          <option value="">-- Next question ID --</option>
          {existingIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      )}

      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={onSubmit}
        >
          {editingId ? 'Update' : 'Add'}
        </button>
        <button className="px-4 py-2 border rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
