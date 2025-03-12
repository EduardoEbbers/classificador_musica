import { Component, ViewChild } from "@angular/core";
import { CifAttrDirective } from "../ondemand/attr.directive";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
    template: `<div><span [cif-attr]='className'>Test Content</span></div>`
})
class TestComponent {
    className = 'initialClass';

    @ViewChild(CifAttrDirective)
    attrDirective!: CifAttrDirective;
}

describe('CifAttrDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: CifAttrDirective;
    let spanElement: HTMLSpanElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, CifAttrDirective]
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        directive = fixture.componentInstance.attrDirective;
        spanElement = fixture.debugElement.query(By.css('span')).nativeElement;
    });

    it('generates the correct number of elements', () => {
        fixture.detectChanges();
        expect(directive.bgClass).toBe('initialClass');
        expect(spanElement.className).toBe('initialClass');

        fixture.componentInstance.className = 'nextClass';
        fixture.detectChanges();
        expect(directive.bgClass).toBe('nextClass');
        expect(spanElement.className).toBe('nextClass');
    });
});