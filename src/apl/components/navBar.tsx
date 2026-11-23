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
    // TODO: restore the coin icon once assets/icons/money.png is publicly readable on S3
    return {
      type: 'Text',
      text: `Coins: ${props.right}`,
    };
  };

  return {
    type: 'Container',
    width: '90vw',
    direction: 'row',
    justifyContent: 'spaceBetween',
    items: [
      ...(props.left ? [renderLeft()] : []),
      ...(props.mid ? [renderMid()] : []),
      ...(props.right != null ? [renderRight()] : []),
    ],
  };
};
