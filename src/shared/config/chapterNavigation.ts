export const CHAPTER_IDS = ['prologue', 'scale', 'record', 'gap', 'answers', 'cases', 'remains'] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];

export function isChapterId(value: string): value is ChapterId {
  return CHAPTER_IDS.includes(value as ChapterId);
}
