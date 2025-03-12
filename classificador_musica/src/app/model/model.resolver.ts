import { Injectable } from "@angular/core";
import { CifraModel } from "./repository.model";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Cifra } from "./cifra.model";
import { MessageService } from "../messages/ message.service";
import { Message } from "../messages/message.model";

@Injectable()
export class ModelResolver {
    constructor(private cifraModel: CifraModel, private messages: MessageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cifra | undefined> {
        this.messages.reportMessage(new Message('Loading data...'));
        return this.cifraModel.getCifraObservable(1);
    }
}