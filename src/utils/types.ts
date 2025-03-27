
export interface Artist {
  id: string;
  name: string;
  info: string;
  imageUrl: string;
  instagramUrl: string;
  category: string;
  subCategory?: string;
  isInfoNode?: boolean;
  faqItems?: {question: string; answer: string}[];
  iconName?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  artists: string[];
  isPast: boolean;
}

export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  artists?: Artist[];
  description?: string;
  faqItems?: {question: string; answer: string}[];
  iconName?: string;
}
