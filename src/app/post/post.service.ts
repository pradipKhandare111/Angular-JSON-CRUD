import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "https://jsonplaceholder.typicode.com/"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  errorHandler = (err: any, caught: Observable<Object>) => {
    // error handling logic here
    return throwError('Something bad happened; please try again later.');
  };
  constructor(private httpClient: HttpClient) { }

  //get all method

  getAll():Observable<any>{
    return this.httpClient.get(this.apiURL+'/posts/').pipe(catchError(this.errorHandler))
  }

  //create method
  create(post: Post): Observable<any> {
    return this.httpClient.post(this.apiURL+'/posts/', JSON.stringify(post), this.httpOptions).pipe(catchError(this.errorHandler))
  }

  //view method
  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL+'/posts/'+id).pipe(catchError(this.errorHandler))
  }

  //update method
  update(id: number, post: Post): Observable<any> {
    return this.httpClient.put(this.apiURL+'/posts/'+id, JSON.stringify(post),this.httpOptions).pipe(catchError(this.errorHandler))
  }

  //delete method
  delete(id: number) {
    return this.httpClient.delete(this.apiURL+'/posts/'+id).pipe(catchError(this.errorHandler))
  }
}

