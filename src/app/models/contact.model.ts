import { EmailValidator } from '@angular/forms';
import { Url } from 'url';

export interface Contact {
    id: string;
    name: string;
    email: EmailValidator;
    phone: string;
    img: Url;
    moves: any
}