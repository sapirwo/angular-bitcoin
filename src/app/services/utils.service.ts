import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  genId(length = 5) {
    let text = "";
    const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += options.charAt(Math.floor(Math.random() * options.length));
    }
    return text;
  }

  sortMoves(item: User | Contact, sortBy: string) {
    if (sortBy === 'date' || !sortBy) {
      return item.moves.sort((a, b) =>
        a.timeStamp - b.timeStamp).reverse()
    }
    if (sortBy === 'sum') {
      return item.moves.sort((a, b) =>
        a.sum - b.sum).reverse()
    }
  }

  formatDate(unixTimestamp): string {
    const formattedDate = new Date(unixTimestamp * 1000)
    const day = formattedDate.getDate()
    const month = formattedDate.getMonth()
    return `${day}/${month}`
  }

  getDateAgo(numOfDaysAgo: number = this.getRandomIntInclusive(1, 3)) {
    const date = new Date()
    return date.setDate(date.getDate() - numOfDaysAgo)
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
