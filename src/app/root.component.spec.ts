import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RootComponent } from './root.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('RootComponent', () => {
  let fixture: ComponentFixture<RootComponent>;
  let component: RootComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RootComponent, RouterTestingModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the app title in an h1', () => {
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Weather App');
    expect(h1).toHaveClass('text-4xl');
  });

  it('should have a router-outlet element in the template', () => {
    fixture.detectChanges();
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });
});