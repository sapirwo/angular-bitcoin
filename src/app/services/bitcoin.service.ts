import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  private _btcRate$ = new BehaviorSubject<any>([])
  public btcRate$ = this._btcRate$.asObservable()
  private _chartData$ = new BehaviorSubject<any>([])
  public chartData$ = this._chartData$.asObservable()
  private RATE_URL = 'https://blockchain.info/ticker'
  private CHART_URL = 'https://api.blockchain.info'
  private CHART_END_POINT = '/charts/trade-volume?timespan=5days&format=json&cors=true'
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  loadRate() {
    const TIME_KEY = 'RATE_TIME'
    const VAL_KEY = 'RATE_VAL'
    if (!this.checkFetchPermission(TIME_KEY)) {
      this._btcRate$.next(this.storageService.load(VAL_KEY))
      return
    }
    this.http.get(this.RATE_URL, this.httpOptions).
      pipe(
        retry(2),
        tap(rate => this.storageService.save(VAL_KEY, rate)),
        catchError(this.handleError('loadRate', []))
      ).subscribe(rate => this._btcRate$.next(rate))
  }

  loadChartData() {
    const TIME_KEY = 'CHART_TIME'
    const VAL_KEY = 'CHART_VAL'
    if (!this.checkFetchPermission(TIME_KEY)) {
      this._chartData$.next(this.storageService.load(VAL_KEY))
      return
    }
    this.http.get(this.CHART_URL + this.CHART_END_POINT).
      pipe(
        retry(1),
        tap(data => this.storageService.save(VAL_KEY, data)),
        catchError(this.handleError('loadChartData', []))
      ).subscribe(data => this._chartData$.next(data))
  }

  private checkFetchPermission(itemToFetch) {
    const timeToFetch = this.storageService.load(itemToFetch)
    if (timeToFetch > Date.now()) return false
    this.storageService.save(itemToFetch, Date.now() * 1000 * 60 * 60)
    return true
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}


