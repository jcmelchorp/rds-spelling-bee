import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { bounceInLeftOnEnterAnimation, hueRotateAnimation, jelloAnimation, rubberBandAnimation } from 'angular-animations';
import { MaterialElevationDirective } from '../../../shared/directives/material-elevation.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MaterialElevationDirective
  ],
  animations: [
    bounceInLeftOnEnterAnimation({ anchor: 'enter1' }),
    bounceInLeftOnEnterAnimation({ anchor: 'enter2', delay: 200 }),
    bounceInLeftOnEnterAnimation({ anchor: 'enter3', delay: 400 }),
    rubberBandAnimation({ anchor: 'rubberBand', delay: 500 }),
    jelloAnimation(),
    hueRotateAnimation({ anchor: 'hueButton', duration: 20000 })

  ]
})
export class HomeComponent {
  defaultElevation = 4;
  raisedElevation = 6;
  animation = 'rubberBand';
  animationState = false;
  animationWithState = false;
  hueBtnState = false;
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
    }, 1);
  }
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Spelling Bee Contest', subtitle:'2025', image:'/assets/images/rds-bee-logo-transparent.png', cols: 1, rows: 1 },
          { title: 'Card 2', subtitle:'', image:'', cols: 1, rows: 1 },
          { title: 'Card 3', subtitle:'', image:'', cols: 1, rows: 1 },
          { title: 'Card 4', subtitle:'', image:'', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Spelling Bee Contest', subtitle:'2025', image:'/assets/images/rds-bee-logo-transparent.png',  cols: 2, rows: 1 },
        { title: 'Card 2', subtitle:'', image:'', cols: 1, rows: 1 },
          { title: 'Card 3', subtitle:'', image:'', cols: 1, rows: 2 },
          { title: 'Card 4', subtitle:'', image:'', cols: 1, rows: 1 }
      ];
    })
  );
}
