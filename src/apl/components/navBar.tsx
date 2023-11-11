// all optional:
// left: back button
// center: title or xp bar
// right: money

export const navBar = (left?: boolean, mid?: string, right?: boolean) => {
  const renderLeft = () => {
    return {
      type: 'TouchWrapper',
      width: '10vw',
      height: '10vw',
      onPress: {
        type: 'SendEvent',
        arguments: ['Button was pressed'],
      },
      item: {
        type: 'Image',
        source: 'https://pixel-pet-paradise.s3.amazonaws.com/assets/icons/back.png',
        width: '10vw',
        height: '10vw',
      },
    };
  };

  const renderMid = () => {
    return {
      type: 'Text',
      text: 'Title',
    };
  };
  const renderRight = () => {
    return {
      type: 'Container',
      direction: 'row',
      items: [
        {
          type: 'Image',
          source: 'https://pixel-pet-paradise.s3.amazonaws.com/assets/icons/money.png',
          width: '10vw',
          height: '10vw',
        },
        {
          type: 'Text',
          text: '200',
        },
      ],
    };
  };

  return {
    type: 'Container',
    direction: 'row',
    justifyContent: 'spaceBetween',
    items: [left && renderLeft(), mid && renderMid(), right && renderRight()],
  };
};
