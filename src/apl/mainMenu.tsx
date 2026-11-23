import { NavBar } from './components/navBar';
import { Pet } from '../util/pet';

export const MainMenuVisuals = (pet: Pet) => {
  return {
    type: 'APL',
    version: '1.0',
    import: [
      {
        name: 'alexa-layouts',
        version: '1.0.0',
      },
    ],
    mainTemplate: {
      parameters: ['payload'],
      items: [
        {
          type: 'Container',
          width: '100vw',
          height: '100vh',
          direction: 'column',
          alignItems: 'center',
          items: [
            NavBar({ mid: pet.name, right: pet.coins }),
            {
              type: 'Image',
              source: `https://pixel-pet-paradise.s3.amazonaws.com/assets/pets/${pet.type}.png`,
              width: '60vh',
              height: '60vh',
              scale: 'best-fit',
            },
            {
              type: 'Text',
              text: `Fullness ${pet.fullness}%   Happiness ${pet.happiness}%   Food ${pet.food}`,
              textAlign: 'center',
            },
          ],
        },
      ],
    },
  };
};
