import { Episodes } from './episodes.model';

export class TvShowDetail {
  countdown: string;
  country: string;
  description_source: string;
  description: string;
  end_date: string;
  episodes: Episodes [];
  genres : string [];
  id: number;
  image_path: string;
  image_thumbnail_path: string;
  name: string;
  permalink: string;
  pictures : string [];
  rating_count: string;
  rating: string;
  runtime: string;
  showTitle: string;
  start_date: string;
  status: string;
}
