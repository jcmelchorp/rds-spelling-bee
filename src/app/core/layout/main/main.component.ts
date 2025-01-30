import { Component, Input, OnInit } from '@angular/core';
import { ChildrenOutletContexts, RouterLink, RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../../../shared/animations/routes.animations';
import { zoomInUpOnEnterAnimation } from 'angular-animations';
import { flyInOut } from '../../../shared/animations/router.animations';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [ RouterOutlet],
  animations: [
    
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
 
 
  ngOnInit(): void {}
}
