import { Injectable } from "@angular/core";
import { Cifra } from "./cifra.model";
import { StaticDataSource } from "./static.datasource";
import { RestDataSource } from "./rest.datasource";
import { Observable, ReplaySubject } from "rxjs";

@Injectable()
export class CifraModel {
    private cifras: Cifra[];
    private locator = (c: Cifra, id?: number) => c.id == id;
    private replaySubject: ReplaySubject<Cifra[]>;

    constructor(private datasource: RestDataSource) {
        this.cifras = new Array<Cifra>();
        /*
        this.datasource.getData()
            .forEach(c => this.cifras.push(c));
        */
       this.replaySubject = new ReplaySubject<Cifra[]>(1);
       this.datasource.getData()
        .subscribe(data => {
            this.cifras = data;
            this.replaySubject.next(data);
            //this.replaySubject.complete();
        });
    }

    getCifras(): Cifra[] {
        return this.cifras;
    }

    getCifra(key: number): Cifra | undefined {
        return this.cifras.find(c => this.locator(c, key));
    }

    getCifrasObservable(): Observable<Cifra[]> {
        return this.replaySubject;
    }

    getCifraObservable(id: number): Observable<Cifra | undefined> {
        let subject = new ReplaySubject<Cifra | undefined>(1);
        this.replaySubject.subscribe(cifras => {
            subject.next(cifras.find(c => this.locator(c, id)));
            subject.complete();
        });
        return subject;
    }

    getNextCifraId(id?: number): Observable<number> {
        let subject = new ReplaySubject<number>(1);
        this.replaySubject.subscribe(cifras => {
            let nextId = 0;
            let index = cifras.findIndex(c => this.locator(c, id));
            if(index > -1) {
                nextId = cifras[cifras.length > index + 1 ? index + 1 : 0].id ?? 0;
            } else {
                nextId = id || 0;
            }
            subject.next(nextId);
            subject.complete();
        });
        return subject;
    }

    getPreviousCifraId(id?: number): Observable<number> {
        let subject = new ReplaySubject<number>(1);
        this.replaySubject.subscribe(cifras => {
            let nextId = 0;
            let index = cifras.findIndex(c => this.locator(c, id));
            if(index > -1) {
                nextId = cifras[index > 0 ? index -1 : cifras.length].id ?? 0;
            } else {
                nextId = id || 0;
            }
            subject.next(nextId);
            subject.complete();
        });
        return subject;
    }

    saveCifra(cifra: Cifra) {
        if(cifra.id == 0 || cifra.id == null) {
            this.datasource.saveCifra(cifra)
                .subscribe(c => this.cifras.push(c));
        } else {
            this.datasource.updateCifra(cifra)
                .subscribe(c => {
                    let index = this.cifras.findIndex(cif => this.locator(cif, cifra.id));
                    this.cifras.splice(index, 1, cifra);
                });
        }
        this.replaySubject.next(this.cifras);
    }

    deleteCifra(key: number) {
        this.datasource.deleteCifra(key)
            .subscribe(() => {
                let index = this.cifras.findIndex(cif => this.locator(cif, key));
                if (index > -1) {
                    this.cifras.splice(index, 1);
                    this.replaySubject.next(this.cifras);
                }
            });
    }
}