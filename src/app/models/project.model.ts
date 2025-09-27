export type Category = 'Angular' | 'PHP' | 'Full-stack' | 'Other';
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: Category;
  githubUrl: string;
  liveUrl: string;
  image: string;
}
