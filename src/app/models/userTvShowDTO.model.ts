import { User } from './user.model';
import { TvShowDTO } from './tvShowDTO.model';

export class UserTvShowDTO {
  user: User;
  tvShow: TvShowDTO;
  watchedStatus: string;
  rate: number;
  opinion: string;
  seasonWatched: string;
  episodeWatched: string;
  reason: string;
  platform: string;
}
