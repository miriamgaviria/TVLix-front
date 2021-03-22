import { User } from './user.model';
import { TvShowDTO } from './tvShowDTO.model';

export class UserTvShowDTO {
  episodeWatched: string;
  id: number;
  opinion: string;
  platform: string;
  rate: number;
  reason: string;
  seasonWatched: string;
  tvShow: TvShowDTO;
  user: User;
  watchedStatus: string;
}
