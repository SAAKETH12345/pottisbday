
export interface BirthdayWish {
  id: string;
  sender: string;
  message: string;
  type: 'ai' | 'human';
  timestamp: number;
}

export enum CelebrationState {
  LOADING = 'LOADING',
  IDLE = 'IDLE',
  PARTYING = 'PARTYING'
}
