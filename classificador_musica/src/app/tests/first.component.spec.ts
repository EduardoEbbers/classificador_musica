import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FirstComponent } from '../ondemand/first.component';
import { Cifra } from '../model/cifra.model';
import { CifraModel } from '../model/repository.model';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `<first [cif-cifraModel]='model'></first>`
})
class TestComponent {
    constructor(public model: CifraModel) { }

    @ViewChild(FirstComponent)
    firstComponent!: FirstComponent;
}

describe('FirstComponent', () => {
    //let fixture: ComponentFixture<FirstComponent>;
    let fixture: ComponentFixture<TestComponent>;
    
    let component: FirstComponent;

    let mockRepository = {
        getCifras: function (){
            return [
                new Cifra(1, 'test1', 'TESTE1', true, true, 'Test1', 100),
                new Cifra(2, 'test2', 'TESTE2', true, true, 'Test2', 100),
                new Cifra(3, 'test3', 'TESTE3', true, true, 'Test3', 100),
            ]
        }
    };

    let debugElement: DebugElement;
    //let bindingElement: HTMLSpanElement;

    //let spanElement: HTMLSpanElement;

    let divElement: HTMLDivElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FirstComponent, TestComponent],
            providers: [
                {provide: CifraModel, useValue: mockRepository}
            ]
        });

        TestBed.compileComponents().then(() => {
            //fixture = TestBed.createComponent(FirstComponent);
            fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();

            //component = fixture.componentInstance;
            component = fixture.componentInstance.firstComponent;

            debugElement = fixture.debugElement;
            //bindingElement = debugElement.query(By.css('span')).nativeElement;
            //spanElement = debugElement.query(By.css('span')).nativeElement;
            //divElement = debugElement.children[0].nativeElement;
        });
    }));

    /*
    it('is defined', () => {
        expect(component).toBeDefined();
    });
    */

   /*
    it('filters artistas', () => {
            //////TA ERRADO ESSES TESTES
       
        component.artista = 'TESTE1';
        fixture.detectChanges();
        expect(component.getCifras().length).toBe(1);
        expect(bindingElement.textContent).toContain('1');
        expect(spanElement.textContent).toContain('1');

        component.artista = 'TESTE3';
        fixture.detectChanges();
        expect(component.getCifras().length).toBe(1);
        expect(bindingElement.textContent).toContain('1');
        
    
    });
    */

    /*
    it('handles mouse events', () => {
        expect(component.highlighted).toBeFalsy();
        expect(divElement.classList.contains('bg-success')).toBeFalsy();

        debugElement.triggerEventHandler('mouseenter', new Event('mouseenter'));
        fixture.detectChanges();
        expect(component.highlighted).toBeTruthy();
        expect(divElement.classList.contains('bg-success')).toBeTruthy();

        debugElement.triggerEventHandler('mouseleave', new Event('mouseleave'));
        fixture.detectChanges();
        expect(component.highlighted).toBeFalsy();
        expect(divElement.classList.contains('bg-success')).toBeFalsy();
    });
    */

    /*
    it('implements output porperty', () => {
        let highlighted: boolean = false;
        component.change.subscribe(value => highlighted = value);
        
        debugElement.triggerEventHandler('mouseenter', new Event('mouseenter'));
        expect(highlighted).toBeTruthy();
        
        debugElement.triggerEventHandler('mouseleave', new Event('mouseleave'));
        expect(highlighted).toBeFalsy();
    });
    */

    it('receives the model through an input property', () => {
        component.artista = 'TEST1';
        fixture.detectChanges();
        let cifras = mockRepository.getCifras()
            .filter(c => c.artista == component.artista);
        
        let componentCifras = component.getCifras();
        for(let i = 0; i < componentCifras.length; i++) {
            expect(componentCifras[i]).toEqual(cifras[i]);
        }
    });
});