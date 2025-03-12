import { ChangeDetectorRef, Component, KeyValueDiffer, KeyValueDiffers } from "@angular/core";
import { CifraModel } from "../model/repository.model";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'cifCifraCount',
    templateUrl: './cifraCount.component.html'
})
export class CifraCountComponent {
    private differ?: KeyValueDiffer<any, any>;
    count: number = 0;
    private artista?: string;

    constructor(private cifraModel: CifraModel,
        private keyValueDiffers: KeyValueDiffers,
        private changeDetector: ChangeDetectorRef,
        activatedRoute: ActivatedRoute) { 
            activatedRoute.pathFromRoot.forEach(route => route.params.subscribe(params => {
                if(params['artista'] != null) {
                    this.artista = params['artista'];
                    this.updateCount();
                }
            }))
        }

    ngOnInit() {
        this.differ = this.keyValueDiffers.find(this.cifraModel.getCifras).create();
    }

    ngDoCheck() {
        if(this.differ?.diff(this.cifraModel.getCifras()) != null) {
            this.updateCount();
        }
    }

    private updateCount() {
        this.count = this.cifraModel.getCifras()
            .filter(c => c.artista == null || c.artista == this.artista)
            .length;
    }
}