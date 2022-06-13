import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((res) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        switch (error.status) {
          case 401:
            console.log('401', error);
            break;
          case 404:
            console.log('404', error);
            break;
          case 403:
            console.log('403', error);
            break;
          default:
            return throwError(() => error);
        }
        return throwError(() => error);
      })
    );
  }
}
