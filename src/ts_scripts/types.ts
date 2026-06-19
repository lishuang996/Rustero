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
  tag: string;
}

export interface TaskItem {
  title: string;
  time: string;
  done: boolean;
}
