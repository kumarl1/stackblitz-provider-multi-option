import { Component, Injectable, InjectionToken, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

export const NotificationHandlers = new InjectionToken<any[]>(
  'NotificationHandler'
);

@Injectable()
export class ClassA {
  send(msg: string) {
    console.log(`Class A:${msg}`);
  }
}

@Injectable()
export class ClassB {
  send(msg: string) {
    console.log(`Class B:${msg}`);
  }
}

@Injectable()
export class ClassC {
  send(msg: string) {
    console.log(`Class C:${msg}`);
  }
  greeting() {
    console.log('Thank you from Class C');
  }
}
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello from {{ name }}!</h1>
    <button (click)="onClick()">Click me</button>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
  providers: [
    {
      provide: NotificationHandlers,
      useClass: ClassA,
      multi: true,
    },
    {
      provide: NotificationHandlers,
      useClass: ClassB,
      multi: true,
    },
    {
      provide: NotificationHandlers,
      useClass: ClassC,
      multi: true,
    },
  ],
})
export class App {
  name = 'Angular';
  notificationHandlers: any[] = inject(NotificationHandlers);
  onClick() {
    this.notificationHandlers.forEach((handler) => {
      handler.send('hello');
      if (handler.greeting) {
        handler.greeting();
      }
      console.log(handler);
    });
  }
}

bootstrapApplication(App);
