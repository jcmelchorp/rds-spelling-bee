import { trigger, state, style, transition, animate } from '@angular/animations';


export const onSideNavChange = trigger('onSideNavChange', [
  state('close',
    style({
      'min-width': '0px',
    })
  ),
  state('open',
    style({
      'min-width': '200px',
    })
  ),
  transition('close => open', animate('400ms ease-in')),
  transition('open => close', animate('400ms ease-out')),
]);


export const onMainContentChange = trigger('onMainContentChange', [
  state('close',
    style({
      'margin-left': '0px'
    })
  ),
  state('open',
    style({
      'margin-left': '200px'
    })
  ),
  transition('close => open', animate('400ms ease-in')),
  transition('open => close', animate('400ms ease-out')),
]);


export const animateText = trigger('animateText', [
  state('hide',
    style({
      'display': 'none',
      opacity: 0,
    })
  ),
  state('show',
    style({
      'display': 'block',
      opacity: 1,
    })
  ),
  transition('hide => show', animate('300ms ease-in')),
  transition('show => hide', animate('100ms ease-out')),
]);
