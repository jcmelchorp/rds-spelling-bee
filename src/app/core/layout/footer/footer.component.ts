import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input() deviceSm!: boolean;


  constructor() { }

  ngOnInit(): void { }
}
