// all optional:
// left: back button
// center: title or xp bar
// right: money

export const navBar = (left?: boolean, mid?: string, right?: boolean) => {
  const renderLeft = () => {
    return {
      type: 'Image',
      source: 'https://i.imgur.com/8J0z8wz.png',
      width: '10vw',
      height: '10vw',
    };
  };
  const renderMid = () => {
    return {
      type: 'Text',
      text: 'Title',
    };
  };
};
const renderRight = () => {
  return {
    type: 'Container',
    direction: 'row',
    items: [
      {
        type: 'Image',
        source: 'https://i.imgur.com/8J0z8wz.png',
        width: '10vw',
        height: '10vw',
      },
      {
        type: 'Text',
        text: 'Title',
      },
    ],
  };
};
