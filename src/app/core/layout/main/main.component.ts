import { Component, Input, OnInit } from '@angular/core';
import { ChildrenOutletContexts, RouterLink, RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../../../shared/animations/routes.animations';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  animations: [
    slideInAnimation
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
 
   loadingText: string = 'Cargando...';
  constructor( private contexts: ChildrenOutletContexts) {}
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  ngOnInit(): void {}
}
