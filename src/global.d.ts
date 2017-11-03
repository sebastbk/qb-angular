export {}

declare global {
  interface String {
    getWordAt(index: number): string;
    replaceWordAt(index: number, word: string): string;
  }
}