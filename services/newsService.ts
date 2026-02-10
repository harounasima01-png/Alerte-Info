
import { Article, Category } from '../types';

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: "Le nouveau modèle Gemini 3 de Google redéfinit l'IA générative",
    description: "Une prouesse technologique qui permet des interactions multimodales en temps réel avec une latence quasi nulle.",
    source: "Tech Crunch France",
    publishedAt: "Il y a 2h",
    url: "https://google.com",
    urlToImage: "https://picsum.photos/seed/tech1/800/450",
    category: "Tech",
    isBreaking: true
  },
  {
    id: '2',
    title: "Élections Législatives : Les derniers sondages avant le premier tour",
    description: "Les intentions de vote se cristallisent alors que la campagne entre dans sa phase finale.",
    source: "Le Monde Politique",
    publishedAt: "Il y a 45min",
    url: "https://lemonde.fr",
    urlToImage: "https://picsum.photos/seed/pol1/800/450",
    category: "Politique",
    isBreaking: true
  },
  {
    id: '3',
    title: "Ligue des Champions : Le PSG s'impose face au Real Madrid",
    description: "Un match mémorable au Parc des Princes qui propulse les parisiens vers la finale.",
    source: "L'Équipe",
    publishedAt: "Il y a 5h",
    url: "https://lequipe.fr",
    urlToImage: "https://picsum.photos/seed/sport1/800/450",
    category: "Sport"
  },
  {
    id: '4',
    title: "Mission Artemis : La NASA annonce la date du prochain décollage lunaire",
    description: "Le programme spatial habité franchit une nouvelle étape cruciale pour le retour sur la Lune.",
    source: "Espace Mag",
    publishedAt: "Il y a 10h",
    url: "https://nasa.gov",
    urlToImage: "https://picsum.photos/seed/monde1/800/450",
    category: "Monde"
  },
  {
    id: '5',
    title: "Inflation : Les prix à la consommation commencent enfin à stagner",
    description: "Les économistes prévoient une accalmie sur le front du pouvoir d'achat pour le second semestre.",
    source: "Les Échos",
    publishedAt: "Il y a 3h",
    url: "https://lesechos.fr",
    urlToImage: "https://picsum.photos/seed/eco1/800/450",
    category: "Économie"
  },
  {
    id: '6',
    title: "César 2024 : Le palmarès complet d'une soirée riche en émotions",
    description: "Le cinéma français a célébré ses talents hier soir avec plusieurs surprises de taille.",
    source: "Culture Obs",
    publishedAt: "Il y a 12h",
    url: "https://culture.fr",
    urlToImage: "https://picsum.photos/seed/cult1/800/450",
    category: "Culture"
  },
  {
    id: '7',
    title: "iPhone 16 Pro : Les premières rumeurs sur le nouveau design fuitent",
    description: "Des rendus 3D montrent un changement radical dans l'agencement des capteurs photo.",
    source: "Apple Insider",
    publishedAt: "Il y a 6h",
    url: "https://apple.com",
    urlToImage: "https://picsum.photos/seed/tech2/800/450",
    category: "Tech"
  },
  {
    id: '8',
    title: "Climat : Le mois de février a été le plus chaud jamais enregistré",
    description: "Une tendance alarmante qui inquiète les scientifiques du monde entier.",
    source: "Géo Planète",
    publishedAt: "Il y a 1j",
    url: "https://geo.fr",
    urlToImage: "https://picsum.photos/seed/monde2/800/450",
    category: "Monde"
  }
];

export const fetchNews = async (category: Category | 'Général'): Promise<Article[]> => {
  // Simulating API latency
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category === 'Général') {
        resolve(MOCK_ARTICLES);
      } else {
        resolve(MOCK_ARTICLES.filter(a => a.category === category));
      }
    }, 1200);
  });
};
