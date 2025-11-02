
export enum AppMode {
  Generator = 'Generator',
  Editor = 'Editor',
  Analyzer = 'Analyzer',
}

export interface MemeTemplate {
  name: string;
  url: string;
}
