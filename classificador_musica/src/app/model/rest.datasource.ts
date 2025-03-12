import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Observable, catchError, delay } from "rxjs";
import { Cifra } from "./cifra.model";

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class RestDataSource {
    constructor(private http: HttpClient, @Inject(REST_URL) private url: string) { }

    getData(): Observable<Cifra[]> {
        return this.sendRequest<Cifra[]>('GET', this.url);
    }

    saveCifra(cifra: Cifra): Observable<Cifra> {
        //return this.http.post<Cifra>(this.url, cifra);
        return this.sendRequest<Cifra>('POST', this.url, cifra);
    }

    updateCifra(cifra: Cifra): Observable<Cifra> {
        //return this.http.put<Cifra>(`${this.url}/${cifra.id}`, cifra);
        return this.sendRequest<Cifra>('PUT', `${this.url}/${cifra.id}`, cifra);
    }

    deleteCifra(id: number): Observable<Cifra> {
        //return this.http.delete<Cifra>(`${this.url}/${id}`);
        return this.sendRequest<Cifra>('DELETE', `${this.url}/${id}`);
    }

    private sendRequest<T>(verb: string, url: string, body?: Cifra): Observable<T> {
        let myHeaders = new HttpHeaders();
        myHeaders = myHeaders.set('Access-Key', '<secret>');
        myHeaders = myHeaders.set('Application-Name', ['classificadorMusica', 'proAngular']);
        return this.http.request<T>(verb, url, {
            body: body,
            headers: myHeaders
        }).pipe(catchError((error: Response) => {
            throw(`NetWork Error: ${error.statusText} (${error.status})`);
        }));
    }
}