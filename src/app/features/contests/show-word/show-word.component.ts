import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-show-word',
  standalone: true,
  imports: [],
  templateUrl: './show-word.component.html',
  styleUrls: ['./show-word.component.scss']
})
export class ShowWordComponent implements OnChanges {
  @Input() text!: string;
  @ViewChild('demoCard') demoCard: ElementRef | undefined;

  private animationBuilder = inject(AnimationBuilder);
  private animationPlayer: AnimationPlayer | undefined;
  uttr: SpeechSynthesisUtterance;

  constructor() {
    this.uttr = new SpeechSynthesisUtterance()
    this.uttr.lang = 'en-US'
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.playText();
  }


  playText() {
    this.uttr.text = 'Your word is: ' + this.text;
    window.speechSynthesis.speak(this.uttr);
    console.log('I just play ', this.text);
  }
  playAnimation(): void {
    const player = this.getAnimationPlayer();
    if (!player) {
      return;
    }
    player.play();
  }

  pauseAnimation(): void {
    const player = this.getAnimationPlayer();
    if (!player || !player.hasStarted) {
      return;
    }
    player.pause();
  }

  stopAnimation(): void {
    const player = this.getAnimationPlayer();
    if (!player || !player.hasStarted) {
      return;
    }
    player.finish();
  }

  resetAnimation(): void {
    const player = this.getAnimationPlayer();
    if (!player || !player.hasStarted) {
      return;
    }
    player.reset();
  }

  private getAnimationPlayer(): AnimationPlayer | undefined {
    if (!this.demoCard?.nativeElement) {
      console.log('No native div element')
      return;
    }
    if (!this.animationPlayer) {
      const factory = this.animationBuilder.build(
        [
          style({ transform: 'rotate(0deg)' }),
          animate('1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ transform: 'rotate(360deg)' }))
        ]
      );
      this.animationPlayer = factory.create(this.demoCard.nativeElement);
    }
    return this.animationPlayer;
  }
}
