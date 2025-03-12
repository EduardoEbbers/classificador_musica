import { Component, ViewChild } from "@angular/core";
import { CifraModel } from "../model/repository.model";
//import { MODES, SharedState } from "./sharedState.service";
import { Cifra } from "../model/cifra.model";
import { ActivatedRoute } from "@angular/router";
import { HighlightTrigger } from "./table.animations";
import { setPropertiesFromClasses } from "./animationUtils";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
    selector: 'cifTable',
    templateUrl: './table.component.html'
})
export class TableComponent {
    artista: string | null = null;
    colsAndRows: string[] = ['id', 'nome', 'artista', 'concluido', 'baixado', 'comentarios','price', 'details', 'buttons'];
    dataSource: MatTableDataSource<Cifra>;

    constructor(public cifraModel: CifraModel, activeRoute: ActivatedRoute) { 
        activeRoute.params.subscribe(params => {
            this.artista = params['artista'] || null;
        });

        this.dataSource = new MatTableDataSource<Cifra>();
        cifraModel.getCifrasObservable().subscribe(newData => {
            this.dataSource.data = newData;
        });
    }

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    @ViewChild(MatSort)
    sort!: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    /*
    getCifras(): Cifra[] {
        return this.cifraModel.getCifras();
    }
    */

    getCifras(): MatTableDataSource<Cifra> {
        return this.dataSource;
    }

    getCifra(key: number): Cifra | undefined {
        return this.cifraModel.getCifra(key);
    }

    deleteCifra(key?: number) {
        if(key != undefined) {
            this.cifraModel.deleteCifra(key);
        }
    }
}