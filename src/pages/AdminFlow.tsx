import { useEffect, useState } from 'react';
import type { Question, QuestionType } from '../types/question';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';
import { BotPreview } from '../components/BotPreview';

type NewQuestion = {
  text?: string;
  type?: QuestionType;
  options?: string[];
  next?: string | Record<'yes' | 'no', string>;
};

export default function AdminFlow() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<NewQuestion>({ type: 'text' });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('chatbot_flow');
    if (saved) setQuestions(JSON.parse(saved));
  }, []);

  const existingIds = questions.map((q) => q.id);

  const handleSubmit = () => {
    if (!newQuestion.text || !newQuestion.type) return;

    const question: Question = {
      id: editingId || `q${questions.length + 1}`,
      text: newQuestion.text!,
      type: newQuestion.type!,
      options:
        newQuestion.type === 'multiple' ? newQuestion.options || [] : undefined,
      next:
        newQuestion.type === 'yesno' && typeof newQuestion.next === 'object'
          ? {
              yes: newQuestion.next.yes || '',
              no: newQuestion.next.no || '',
            }
          : typeof newQuestion.next === 'string'
          ? newQuestion.next
          : '',
    };

    const updated = editingId
      ? questions.map((q) => (q.id === editingId ? question : q))
      : [...questions, question];

    setQuestions(updated);
    setNewQuestion({ type: 'text' });
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Bot Flow Builder</h1>

      <QuestionForm
        editingId={editingId}
        newQuestion={newQuestion}
        existingIds={existingIds}
        onChange={setNewQuestion}
        onSubmit={handleSubmit}
        onCancel={() => {
          setNewQuestion({ type: 'text' });
          setEditingId(null);
        }}
      />

      <QuestionList
        questions={questions}
        onEdit={(id) => {
          const q = questions.find((q) => q.id === id);
          if (!q) return;
          setNewQuestion({
            text: q.text,
            type: q.type,
            options: q.options,
            next:
              typeof q.next === 'object' && q.next !== null
                ? {
                    yes: q.next.yes ?? '',
                    no: q.next.no ?? '',
                  }
                : q.next,
          });
          setEditingId(q.id);
        }}
        onDelete={(id) => {
          setQuestions(questions.filter((q) => q.id !== id));
          if (editingId === id) {
            setNewQuestion({ type: 'text' });
            setEditingId(null);
          }
        }}
        onSave={() => {
          localStorage.setItem('chatbot_flow', JSON.stringify(questions));
          alert('Saved to localStorage');
        }}
        onClear={() => {
          localStorage.removeItem('chatbot_flow');
          setQuestions([]);
          setNewQuestion({ type: 'text' });
          setEditingId(null);
        }}
      />

      <BotPreview questions={questions} />
    </div>
  );
}
