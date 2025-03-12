import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ModelModule } from "../model/model.module";
import { NgModule } from "@angular/core";
import { TableComponent } from "./table.component";
import { FormComponent } from "./form.component";
//import { SharedState } from "./sharedState.service";
import { ValidationHelper } from "./validation_helper";
import { ValidationErrorsDirective } from "./validationErrors.directive";
import { HiLowValidatorDirective } from "../validation/hilow";
import { RouterModule } from "@angular/router";
import { CifraCountComponent } from "./cifraCount.component";
import { ArtistaCountComponent } from "./artistaCount.component";
import { NotFoundComponent } from "./notFound.component";
import { UnsavedGuard } from "./unsaved.guard";
import { MaterialFeatures } from "../material.module";
import { CustomButton } from "./customButton.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModelModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialFeatures
    ],
    declarations: [
        TableComponent,
        FormComponent, 
        ValidationHelper,
        ValidationErrorsDirective,
        HiLowValidatorDirective,
        CifraCountComponent,
        ArtistaCountComponent,
        NotFoundComponent,
        CustomButton
    ],
    exports: [
        ModelModule,
        TableComponent,
        FormComponent
    ],
    providers: [UnsavedGuard]
})
export class CoreModule { }