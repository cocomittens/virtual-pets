type Item = {
  img: string;
  name: string;
};

export const selectThree = (items: Item[]) => {
  const renderItem = (item: Item) => ({
    type: 'Container',
    direction: 'row',
    justifyContent: 'spaceEvenly',
    items: [
      {
        type: 'Container',
        direction: 'column',
        alignItems: 'center',
        items: [
          {
            type: 'Image',
            source: item.img,
            width: '20vw',
            height: '20vw',
          },
          {
            type: 'Text',
            text: item.name,
            color: '@text',
          },
        ],
      },
    ],
  });

  const renderItems = () => items.map(renderItem);

  return {
    type: 'APL',
    version: '2023.2',
    settings: {},
    import: [
      {
        name: 'alexa-layouts',
        version: '1.7.0',
      },
    ],
    resources: [
      {
        colors: {
          text: '#565A5C',
        },
      },
    ],
    styles: {},
    onMount: [],
    graphics: {},
    commands: {},
    layouts: {},
    mainTemplate: {
      parameters: ['payload'],
      items: [
        {
          type: 'Frame',
          backgroundColor: '#fff',
          items: [
            {
              type: 'Container',
              width: '100vw',
              height: '100vh',
              direction: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              items: renderItems(),
            },
          ],
        },
      ],
    },
  };
};
