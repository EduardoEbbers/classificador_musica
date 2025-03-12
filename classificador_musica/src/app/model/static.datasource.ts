import { Injectable } from "@angular/core";
import { Cifra } from "./cifra.model";

@Injectable()
export class StaticDataSource {
    private data: Cifra[];

    constructor() {
        this.data = new Array<Cifra>(
            new Cifra(1, 'hole in my soul', 'aerosmith', false, false, 'treinar mais', 275, {supplier: 'Acme', keywords: ['boat', 'small']}),
            new Cifra(2, 'pink', 'aerosmith', true, true, 'treinar menos', 10, {supplier: 'Smoot Co', keywords: ['safaty']}),
            new Cifra(3, 'a ilha', 'djavan', true, false, 'treinar treinar', 400),
            new Cifra(4, 'alibi', 'djavan', false, true, 'mais mais', 150),
            new Cifra(5, 'linger', 'cranberries', false, false, 'menos menos', 2)

        );
    }

    getData(): Cifra[] {
        return this.data;
    }
}