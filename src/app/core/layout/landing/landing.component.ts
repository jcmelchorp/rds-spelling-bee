import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {
  bounceInDownOnEnterAnimation,
  bounceInLeftOnEnterAnimation,
  bounceInRightOnEnterAnimation,
  bounceInUpOnEnterAnimation,
  hueRotateAnimation,
  jackInTheBoxOnEnterAnimation,
  jelloAnimation,
  rubberBandAnimation,
} from 'angular-animations';
import { FlexModule } from 'ngx-flexible-layout';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, FlexModule],
  animations: [
    bounceInUpOnEnterAnimation({ anchor: 'enter1' }),
    bounceInLeftOnEnterAnimation({ anchor: 'enter2', delay: 200 }),
    bounceInDownOnEnterAnimation({ anchor: 'enter3', delay: 200 }),
    bounceInRightOnEnterAnimation({ anchor: 'enter4', delay: 200 }),
    jackInTheBoxOnEnterAnimation({ anchor: 'enter5', delay: 200 }),
    rubberBandAnimation({ anchor: 'rubberBand', delay: 500 }),
    jelloAnimation(),
    hueRotateAnimation({ anchor: 'hueButton', duration: 20000 }),
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent implements OnInit {
  hueBtnState = false;
  animationState = false;
  animationWithState = false;

  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
    }, 1);
  }
  duration = 15 * 1000;
  animationEnd = Date.now() + this.duration;
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  constructor() {}

  ngOnInit() {}
}
