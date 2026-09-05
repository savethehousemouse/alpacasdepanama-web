export interface ExhibitionPiece {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  series: string;
  materiality: string;
  tonalities: string;
  origins: string;
  year: string;
  curatorNote: string;
  dimensions: string;
}

export type NavTab = 'atelier' | 'exhibitions' | 'journal' | 'contact';
