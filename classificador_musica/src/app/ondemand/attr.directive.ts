import { Directive, ElementRef, Input, SimpleChange } from "@angular/core";

@Directive({
    selector: '[cif-attr]'
})
export class CifAttrDirective {
    constructor(private element: ElementRef) { }

    @Input('cif-attr')
    bgClass?: string;

    ngOnChanges(changes: {[property: string]: SimpleChange}) {
        let change = changes['bgClass'];
        let classList = this.element.nativeElement.classList;

        if(!change.isFirstChange() && classList.contains(change.previousValue)) {
            classList.remove(change.previousValue);
        }
        if(!classList.contains(change.currentValue)) {
            classList.add(change.currentValue);
        }
    }
}