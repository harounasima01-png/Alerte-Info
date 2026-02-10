
export type Category = 'Général' | 'Tech' | 'Politique' | 'Sport' | 'Monde' | 'Économie' | 'Culture';

export interface Article {
  id: string;
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
  category: Category;
  isBreaking?: boolean;
}

export interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}
