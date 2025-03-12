import { ChangeDetectorRef, Component, KeyValueDiffer, KeyValueDiffers } from "@angular/core";
import { CifraModel } from "../model/repository.model";

@Component({
    selector: 'cifArtistaCount',
    templateUrl: './artistaCount.component.html'
})
export class ArtistaCountComponent {
    private differ?: KeyValueDiffer<any, any>;
    count: number = 0;

    constructor(private cifraModel: CifraModel,
        private differs: KeyValueDiffers,
        private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        this.differ = this.differs.find(this.cifraModel.getCifras()).create();
    }

    ngDoCheck() {
        if(this.differ?.diff(this.cifraModel.getCifras()) != null) {
            this.count = this.cifraModel.getCifras()
                .map(c => c.artista)
                .filter((artista, index, array) => array.indexOf(artista) == index)
                .length;
        }
    }
}