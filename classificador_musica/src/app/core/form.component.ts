import { Component } from "@angular/core";
import { Cifra } from "../model/cifra.model";
import { CifraModel } from "../model/repository.model";
import { MODES, SharedState, StateUpdate } from "./sharedState.service";
import { MessageService } from "../messages/ message.service";
import { Message } from "../messages/message.model";
import { FormArray, FormControl, FormGroup, FormsModule, NgForm, Validators } from "@angular/forms";
import { FilteredFormArray } from "./filteredFormArray";
import { LimitValidator } from "../validation/limit";
import { UniqueValidator } from "../validation/unique";
import { ProhibitedValidator } from "../validation/prohibited";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'cifForm',
    templateUrl: './form.component.html',
    styleUrls: ['form.component.css']
})
export class FormComponent {
    cifra: Cifra = new Cifra();
    editing: boolean = false;

    keywordGroup = new FilteredFormArray([
        this.createKeywordFormControl()
    ], {
        validators: UniqueValidator.unique()
    });

    cifraForm: FormGroup = new FormGroup({
        nome: new FormControl('', {
            validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern('^[A-Za-z ]+$')
            ],
            updateOn: 'change'
        }),
        artista: new FormControl('', {
            validators: Validators.required,
            asyncValidators: ProhibitedValidator.prohibited()
        }),
        concluido: new FormControl('', {
            validators: Validators.required
        }),
        baixado: new FormControl('', {
            validators: Validators.required
        }),
        comentarios: new FormControl('', {
            validators: Validators.required
        }),
        price: new FormControl('', {
            validators: [
                Validators.required,
                Validators.pattern('^[0-9\.]+$'),
                LimitValidator.Limit(300)
            ]
        }),
        details: new FormGroup({
            supplier: new FormControl('', { validators: Validators.required}),
            keywords: this.keywordGroup,
        }),
    });

    /*
    constructor(private cifraModel: CifraModel,
        private state: SharedState,
        private messageService: MessageService) {
        this.state.changes.subscribe((upd) => this.handleStateChange(upd));
        this.messageService.reportMessage(new Message('Creating New Cifra'));
    }
    */

    constructor(public cifraModel: CifraModel, activeRoute: ActivatedRoute, private router: Router) {
        /*
        this.editing = activeRoute.snapshot.params['mode'] == 'edit';
        let id = activeRoute.snapshot.params['id'];
        if(id != null) {
            cifraModel.getCifraObservable(id).subscribe(c => {
                //Object.assign(this.cifra, c || new Cifra());
                
                //this.cifra.nome = activeRoute.snapshot.params['nome'] ?? this.cifra.nome;
                //this.cifra.artista = activeRoute.snapshot.params['artista'] ?? this.cifra.artista;
                //let price = activeRoute.snapshot.params['price'];
                //if(price != null) {
                //    this.cifra.price == Number.parseFloat(price);
                //}
                //
                this.cifraForm.patchValue(this.cifra);
            });
        }
        */
       
        activeRoute.params.subscribe(params => {
            this.editing = params['mode'] == 'edit';
            let id = params['id'];
            if(id != null) {
                cifraModel.getCifraObservable(id).subscribe(c => {
                    Object.assign(this.cifra, c || new Cifra());
                    this.cifraForm.patchValue(this.cifra);
                });
            }
        });
    }
    
    /*
    handleStateChange(newState: StateUpdate) {
        this.editing = newState.mode == MODES.EDIT;
        this.keywordGroup.clear();
        if(this.editing && newState.id) {
            Object.assign(this.cifra, this.cifraModel.getCifra(newState.id) ?? new Cifra());
            this.messageService.reportMessage(new Message(`Editing ${this.cifra.nome}`));
            this.cifra.details?.keywords?.forEach(val => {
                this.keywordGroup.push(this.createKeywordFormControl());
            })
        } else {
            this.cifra = new Cifra();
            this.messageService.reportMessage(new Message('Creating New Cifra'));
        }
        if(this.keywordGroup.length == 0) {
            this.keywordGroup.push(this.createKeywordFormControl());
        }
        this.cifraForm.reset(this.cifra);
    }
    */

    submitForm() {
        if(this.cifraForm.valid) {
            Object.assign(this.cifra, this.cifraForm.value);
            this.cifraModel.saveCifra(this.cifra);
            /*
            this.cifra = new Cifra();
            this.keywordGroup.clear();
            this.keywordGroup.push(this.createKeywordFormControl());
            this.cifraForm.reset();
            */
           this.router.navigateByUrl('/');
        }
    }

    /*
    resetForm() {
        this.keywordGroup.clear();
        this.keywordGroup.push(this.createKeywordFormControl());
        this.editing = true;
        this.cifra = new Cifra();
        this.cifraForm.reset();
    }
    */

    unsavedChanges(): boolean {
        return this.cifraForm.dirty;
    }

    createKeywordFormControl(): FormControl {
        return new FormControl('', {validators: Validators.pattern('^[A-Za-z ]+$')});
    }

    addKeywordControl() {
        this.keywordGroup.push(this.createKeywordFormControl());
    }

    removeKeywordControl(index: number) {
        this.keywordGroup.removeAt(index);
    }
}