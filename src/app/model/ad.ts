import { User } from 'src/app/model/user';
import { Category } from 'src/app/model/category';
import { Location } from 'src/app/model/location';

export class Ad {
    id!: number;
    title!: string;
    description!: string;
    price!: number;
    publishDate!: Date;
    expireDate!: Date;
    contactUser!: User;
    category!: Category;
    location!: Location;
    pictures!: string[];
}
