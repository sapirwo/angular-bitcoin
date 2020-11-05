import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  load(key: string) {
    const val = localStorage.getItem(key)
    return (val) ? JSON.parse(val) : null;
  }
  save(key: string, val: any) {
    localStorage[key] = JSON.stringify(val);
    return val
  }
}
