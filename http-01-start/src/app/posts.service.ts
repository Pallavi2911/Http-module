import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.module';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  onCreateAndSharePost(postData: Post) {
    // Send Http request
    console.log('request: ');
    console.log(postData);
    //posts.json added at the end of firebase url is just firebase requirement
    //Angular HTTP client will take our JavaScript object postData here and automatically convert it to JSON data for us.
    //that requests are only sent when you subscribe.
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-5f4b0-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        postData,
        {
          observe: 'response',
        }
      )
      .subscribe(
        (responseData) => {
          console.log('response: ');
          console.log(responseData.body);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-5f4b0-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
          //params: new HttpParams().set('print', 'pretty'),
          params: searchParams,
        }
      )
      .pipe(
        //use of map operator to transform response data
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          //you could consider using catchError if you have some generic
          //error handling task you wanna execute.
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(
        'https://ng-complete-guide-5f4b0-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          observe: 'events',
        }
      )
      .pipe(
        tap((event) => {
          console.log('delete : ');
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            //console.log(event.body);
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
