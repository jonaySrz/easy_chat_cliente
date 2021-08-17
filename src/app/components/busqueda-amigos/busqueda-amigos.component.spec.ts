import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaAmigosComponent } from './busqueda-amigos.component';

describe('BusquedaAmigosComponent', () => {
  let component: BusquedaAmigosComponent;
  let fixture: ComponentFixture<BusquedaAmigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaAmigosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
