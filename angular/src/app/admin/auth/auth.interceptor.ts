import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set(
                    'Accept',
                    'multipart / form - data'
                ).set(
                    'Authorization',
                    'Bearer ' + localStorage.getItem('token')
                ),
            });
            return next.handle(clonedReq).pipe(
                tap(
                    (success) => { },
                    (error) => {
                        if (error.status == 401) {
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/admin/login');
                        }
                    }
                )
            );
        } else {
            return next.handle(req.clone());
        }
    }
}
