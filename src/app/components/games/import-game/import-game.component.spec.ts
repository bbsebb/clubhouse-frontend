import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGameComponent } from './import-game.component';

describe('ImportGameComponent', () => {
  let component: ImportGameComponent;
  let fixture: ComponentFixture<ImportGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImportGameComponent]
    });
    fixture = TestBed.createComponent(ImportGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
