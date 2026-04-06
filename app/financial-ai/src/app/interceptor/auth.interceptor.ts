import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();

  const isPublic =
    req.url.endsWith('/login') ||
    (req.method === 'POST' && req.url.endsWith('/users'));

  const request = (!token || isPublic)
    ? req
    : req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  return next(request).pipe(
    catchError(err => {
      if (err.status === 401 || err.status === 403) {
        auth.logout(true);            
        router.navigateByUrl('/login');
      }
      return throwError(() => err);
    })
  ); 
};
