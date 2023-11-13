import { NavBar } from './components/navBar';
export const MainMenu = () => {
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
        NavBar(false, null, 200),
        {
          type: 'Image',
          source: 'https://pixel-pet-paradise.s3.amazonaws.com/assets/pets/bunny.png',
        },
      ],
    },
  };
};
