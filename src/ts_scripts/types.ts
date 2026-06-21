export interface StatItem {
  title: string;
  value: number;
  suffix: string;
  note: string;
  accent: string;
}

export interface ProjectItem {
  title: string;
  kind: string;
  status: string;
  update: string;
  members: string[];
  color: string;
}

export interface PaperItem {
  title: string;
  source: string;
  year: number;
  tags: string[];
  authors: string[];
  summary: string;
  pdfUrl: string;
  entryType: "journal" | "conference";
  publishDate: string;
  doi: string;
}

export interface TaskItem {
  title: string;
  time: string;
  done: boolean;
}
