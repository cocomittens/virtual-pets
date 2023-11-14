type Item = {
  img: string;
  name: string;
};

export const customize = (items: Item[]) => {
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
          type: 'TouchWrapper',
          width: '100dp',
          height: '50dp',
          onPress: {
            type: 'SendEvent',
            arguments: ['Button was pressed'],
          },
          item: {
            type: 'Image',
            source: 'https://pixel-pet-paradise.s3.amazonaws.com/assets/icons/next.png',
          },
        },
        renderItems(),
        {
          type: 'TouchWrapper',
          width: '100dp',
          height: '50dp',
          onPress: {
            type: 'SendEvent',
            arguments: ['Button was pressed'],
          },
          item: {
            type: 'Image',
            source: 'https://pixel-pet-paradise.s3.amazonaws.com/assets/icons/prev.png',
          },
        },
      ],
    },
  };
};
