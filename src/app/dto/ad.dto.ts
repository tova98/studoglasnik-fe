import { User } from 'src/app/model/user';
import { Category } from 'src/app/model/category';
import { Location } from 'src/app/model/location';

export class AdDto {
    title!: string;
    description!: string;
    price!: number;
    duration!: number;
    contactUser!: User;
    category!: Category;
    location!: Location;
}
