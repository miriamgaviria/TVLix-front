import { Episodes } from './episodes.model';

export class UserTvShow {
  userId: number;
  tvShowId: number;
  watchedStatus: string;
  rate: number;
  opinion: string;
  seasonWatched: number;
  episodeWatched: number;
  reason: string;
  platform: string;
}
