import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('{{duration}} {{delay}} ease-out', style({ opacity: 1 }))
  ], { params: { duration: '400ms', delay: '0ms' }})
]);

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate('{{duration}} {{delay}} cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
  ], { params: { duration: '500ms', delay: '0ms' }})
]);

export const listStagger = trigger('listStagger', [
  transition(':enter', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(10px)' }),
      stagger(80, [
        animate('400ms ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ], { optional: true })
  ])
]);

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [ style({ position: 'absolute', left: 0, top: 0, width: '100%' }) ], { optional: true }),
    group([
      query(':enter', [ style({ opacity: 0, transform: 'translateY(10px)' }), animate('350ms ease-out', style({ opacity: 1, transform: 'none' })) ], { optional: true }),
      query(':leave', [ style({ opacity: 1 }), animate('250ms ease-in', style({ opacity: 0 })) ], { optional: true })
    ])
  ])
]);
