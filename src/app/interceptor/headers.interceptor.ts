import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiKey = 'Bearer [API_KEY]'
    const cloned = request.clone({
      setHeaders: {
        Aurthorization: apiKey,
      }
    });

    return next.handle(cloned).pipe(catchError(error => {
      if (error.value === 403) {
        console.log("Unaurthorized user => error " + error.value + " (message : " + error.message + ")");
      }
      else if (error.value === 502) {
        console.log("Bad Gateway error " + error.value + " (message : " + error.message + ")");
      }
      else if (error.value === 401) {
        console.log("Session expired error " + error.value + " (message : " + error.message + ")");
      }
      else{
        console.log("error code : "+error.value+" (message : "+error.message+")");
      }

      return new Observable<HttpEvent<any>>();

    }));
  }
}
