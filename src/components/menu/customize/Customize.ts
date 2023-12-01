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
    const items = [{ name: 'item 1' }, { name: 'item 2' }, { name: 'item 3' }, { name: 'item 4' }];
    const pageSize = 3;
    const numPages = Math.ceil(items.length / pageSize);
    (this.$session.$data as { page: number; numPages: number }) = {
      page: 0,
      numPages,
    };
    return this.$send('Customize pet');
  }

  @Intents(['PreviousIntent'])
  prevPage() {
    let page = (this.$session.$data as { page: number }).page;
    if (page) {
      (this.$session.$data as { page: number }).page = page - 1;
    }
  }

  @Intents(['NextIntent'])
  nextPage() {
    const numPages = (this.$session.$data as { page: number; numPages: number }).numPages;
    let page = (this.$session.$data as { page: number; numPages: number }).page;
    if (page < numPages - 1) {
      (this.$session.$data as { page: number }).page = page + 1;
    }
  }

  UNHANDLED() {
    return this.START();
  }
}
