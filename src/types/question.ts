export type QuestionType = 'text' | 'yesno' | 'multiple';

export type Question = {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  next?: string | Record<'yes' | 'no', string | null>;
};
