import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./core/form.component";
import { TableComponent } from "./core/table.component";
import { NotFoundComponent } from "./core/notFound.component";
import { CifraCountComponent } from "./core/cifraCount.component";
import { ArtistaCountComponent } from "./core/artistaCount.component";
import { ModelResolver } from "./model/model.resolver";
import { TermsGuard } from "./terms.guard";
import { UnsavedGuard } from "./core/unsaved.guard";
import { LoadGuard } from "./load.guard";

/*
const childRoutes: Routes = [
    {
        path: '',
        children: [
            {path: 'cifras', component: CifraCountComponent},
            {path: 'artistas', component: ArtistaCountComponent},
            {path: '', component: CifraCountComponent}
        ],
        resolve: {model: ModelResolver},
        canActivateChild: [TermsGuard]
    }
];

const routes: Routes = [
    {
        path: 'ondemand',
        loadChildren: () => import('./ondemand/ondemand.module').then(m => m.OndemandModule),
        canLoad: [LoadGuard]
    },
    {
        path: 'form/:mode/:id', 
        component: FormComponent, 
        resolve: {model: ModelResolver},
        canDeactivate: [UnsavedGuard]
    },
    {
        path: 'form/:mode', 
        component: FormComponent, 
        resolve: {model: ModelResolver},
        canActivate: [TermsGuard]
    },
    {path: 'does', redirectTo: '/form/create', pathMatch: "prefix"},

   {path: 'table', component: TableComponent, children: childRoutes},
   {path: 'table/:artista', component: TableComponent, children: childRoutes},
    {path: '', redirectTo: '/table', pathMatch: "full"},
    
    {path: '**', component: NotFoundComponent},
];

*/

/*
const routes: Routes = [
    {
        path: 'form/:mode/:id', 
        component: FormComponent, 
        canDeactivate: [UnsavedGuard]
    },
    {
        path: 'form/:mode', 
        component: FormComponent
    },
    {path: 'table', component: TableComponent},
    {path: 'table/:artista', component: TableComponent},
    {path: '', redirectTo: '/table', pathMatch: "full"},
    
    {path: '**', component: NotFoundComponent},
];
*/

const routes: Routes = [
    {
        path: 'ondemand',
        loadChildren: () => import('./ondemand/ondemand.module').then(m => m.OndemandModule)
    },
    {path: '', redirectTo: '/ondemand', pathMatch: "full"}
];

export const routing = RouterModule.forRoot(routes);
