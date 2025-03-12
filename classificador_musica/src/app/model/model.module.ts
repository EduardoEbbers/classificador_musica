import { NgModule } from "@angular/core";
import { CifraModel } from "./repository.model";
import { StaticDataSource } from "./static.datasource";
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { REST_URL, RestDataSource } from "./rest.datasource";
import { ModelResolver } from "./model.resolver";

@NgModule({
    imports: [
        HttpClientModule,
        HttpClientJsonpModule
    ],
    providers: [
        CifraModel,
        RestDataSource,
        { provide: REST_URL, useValue: `http://${location.hostname}:3500/cifras`},
        ModelResolver
    ]
})
export class ModelModule { }