// all optional:
// left: back button
// center: title or xp bar
// right: money

interface NavBarProps {
  left?: boolean;
  mid?: string | null;
  right?: number | null;
}

export const NavBar = (props: NavBarProps) => {
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
      text: props.mid,
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
          text: props.right,
        },
      ],
    };
  };

  return {
    type: 'Container',
    direction: 'row',
    justifyContent: 'spaceBetween',
    items: [props.left && renderLeft(), props.mid && renderMid(), props.right && renderRight()],
  };
};
