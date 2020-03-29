import { User } from './user.model';

export class Opinion {
    id: number;
    comment: string;
    mail: string;
    rate: string;
    user: User;
}