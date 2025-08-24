import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Indicateur } from './indicateur.component';

describe('Indicateur', () => {
  let component: Indicateur;
  let fixture: ComponentFixture<Indicateur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Indicateur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Indicateur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
