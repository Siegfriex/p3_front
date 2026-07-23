export const CHAPTER_IDS = ['prologue', 'scale', 'record', 'gap', 'answers', 'cases', 'remains'] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];

export const STORY_CHAPTER_NAVIGATION = [
  { id: 'prologue', order: 0, title: '질문은 남았다' },
  { id: 'scale', order: 1, title: '요구는 얼마나 쌓였나' },
  { id: 'record', order: 2, title: '요구에서 결과까지' },
  { id: 'gap', order: 3, title: '완료와 진행의 경계' },
  { id: 'answers', order: 4, title: '어떻게 답했나' },
  { id: 'cases', order: 5, title: '완료라고 쓰였지만' },
  { id: 'remains', order: 6, title: '끝나지 않은 문장' },
] as const satisfies ReadonlyArray<{ id: ChapterId; order: number; title: string }>;

export function isChapterId(value: string): value is ChapterId {
  return CHAPTER_IDS.includes(value as ChapterId);
}
