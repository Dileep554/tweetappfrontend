import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {  
    
    constructor(public auth: AuthService) {}  
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
      
    request = request.clone({  
      setHeaders: {  
        Authorization: `${this.auth.getToken()}`  
      }  
    });   
    return next.handle(request);  
  }  
} 