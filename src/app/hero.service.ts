import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

  private heroesUrl = 'api/heroes'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => console.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    )
  }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  constructor( private http: HttpClient) { }
}
