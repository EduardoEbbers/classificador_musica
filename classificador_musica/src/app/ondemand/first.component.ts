import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { CifraModel } from "../model/repository.model";
import { Cifra } from "../model/cifra.model";

@Component({
    selector: 'first',
    templateUrl: './first.component.html'
})
export class FirstComponent { 
    constructor(private cifraModel: CifraModel) { }

    artista: string = 'Aerosmith';
    highlighted: boolean = false;

    /*
    @Output('cif-highlight')
    change = new EventEmitter<boolean>();
    */

   /*
    getCifras(): Cifra[] {
        return this.cifraModel.getCifras()
            .filter(c => c.artista == this.artista);
    }
    */

    getCifras(): Cifra[] {
        return this.cifraModel == null ? [] : this.cifraModel.getCifras()
            .filter(c => c.artista == this.artista);
    }

    /*
    @HostListener('mouseenter', ['$event.type'])
    @HostListener('mouseleave', ['$event.type'])
    setHighlight(type: string) {
        this.highlighted = type == 'mouseenter';
        this.change.emit(this.highlighted);
    }
    */
   
    @Input('cif-cifraModel')
    model?: CifraModel;
}