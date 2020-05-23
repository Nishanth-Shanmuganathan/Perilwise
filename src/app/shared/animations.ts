import { animate, style, transition, trigger } from '@angular/animations';

export const routeFadeStateTrigger = trigger('routeFadeState', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(500)
  ]),
  transition(':leave', animate(300, style({
    opacity: 0
  })))
]);

export const displayFadeStateTrigger = trigger('displayFadeState', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(1000)
  ]),
  transition(':leave', animate(300, style({
    opacity: 0
  })))
]);
