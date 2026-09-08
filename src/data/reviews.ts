/** Fictional customer reviews for this demonstration fixture. */
export interface Review {
  id: string;
  author: string;
  location: string;
  productId: string;
  stars: number;
  title: string;
  body: string;
  /** ISO date the review was left. */
  date: string;
  verified: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Jamie O.',
    location: 'Bend, OR',
    productId: 'p1',
    stars: 5,
    title: 'Held up through a full season',
    body: 'Wore the Ridgeline every day of a wet October and it never wetted out. The pit zips are placed properly, which is rarer than it should be.',
    date: '2026-07-14',
    verified: true,
  },
  {
    id: 'r2',
    author: 'Priya R.',
    location: 'Golden, CO',
    productId: 'p2',
    stars: 4,
    title: 'Great once broken in',
    body: 'Took about two weeks to soften up. Sized down a half and that was the right call. The resole option is why I bought them.',
    date: '2026-06-30',
    verified: true,
  },
  {
    id: 'r3',
    author: 'Marcus L.',
    location: 'Burlington, VT',
    productId: 'p5',
    stars: 5,
    title: 'My default trail shoe now',
    body: 'The rock plate makes a real difference on scree. Drainage is good and they dry overnight.',
    date: '2026-08-02',
    verified: true,
  },
  {
    id: 'r4',
    author: 'Elena V.',
    location: 'Squamish, BC',
    productId: 'p3',
    stars: 5,
    title: 'Does not itch',
    body: 'Merino that actually behaves. Cuff stays put under a helmet.',
    date: '2026-05-19',
    verified: false,
  },
];
