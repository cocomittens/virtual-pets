import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { ChoosePetOutput } from '../../output/ChoosePetOutput';
import { Tutorial } from './Tutorial';

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
export class CreatePet extends BaseComponent {
  START() {
    return this.$send(ChoosePetOutput, {
      message: 'Do you want to adopt a dog, cat or bunny?',
      listen: true,
    });
  }

  @Intents(['PetTypeIntent'])
  collectPetType() {
    // ensure session data is initialized
    const data = (this.$session.$data as any) ?? {};
    data.petType = this.$entities.petType?.resolved;
    // save back to session
    this.$session.$data = data;
    // proceed to tutorial
    return this.$redirect(Tutorial);
  }

  UNHANDLED() {
    return this.START();
  }
}
