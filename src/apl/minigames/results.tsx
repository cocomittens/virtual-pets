import { Button } from '../components/button';
export const Results = (xp: number, money: number) => {
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
          type: 'Text',
          text: `XP: ${xp}`,
        },
        {
          type: 'Text',
          text: `Money: ${money}`,
        },
        Button('Play Again'),
      ],
    },
  };
};
