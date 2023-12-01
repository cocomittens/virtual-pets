import { Component, BaseComponent, Intents } from '@jovotech/framework';

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
| A component consists of handlers that respond to specific user requests
| Learn more here: www.jovo.tech/docs/components, jovo.tech/docs/handlers
|
*/
@Component()
export class Customize extends BaseComponent {
  START() {
    (this.$session.$data as { page: number }).page = 0;
    return this.$send('Customize pet');
  }

  @Intents(['NextIntent'])
  nextPage() {
    let page = (this.$session.$data as { page: number }).page;
    if (page) {
      (this.$session.$data as { page: number }).page = page + 1;
    }
  }

  UNHANDLED() {
    return this.START();
  }
}
