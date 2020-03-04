import { Episodes } from './episodes.model';

export class TvShow {
    //showTitle: string;
    id: number;
    name: string;
    permalink: string;
    url: string;
    description: string;
    description_source: string;
    start_date: string;
    end_date: string;
    country: string;
    status: string;
    runtime: string;
    network: string;
    youtube_link: string;
    image_path: string;
    image_thumbnail_path: string;
    raing: string;
    rating_count: string;
    countdown: string;
    genres : string [];
    pictures : string [];
    episodes: Episodes [];
}
