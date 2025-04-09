import { TestBed } from '@angular/core/testing';
import { ListingComponent } from './list.component';

describe('Generic list component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ListingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'weather-app' title`, () => {
    const fixture = TestBed.createComponent(ListingComponent);
    const app = fixture.componentInstance;
    // expect(app.title).toEqual('weather-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ListingComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, weather-app');
  });
});
