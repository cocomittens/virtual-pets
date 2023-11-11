export const button = () => {
  return {
    type: 'TouchWrapper',
    width: '100dp',
    height: '50dp',
    onPress: {
      type: 'SendEvent',
      arguments: ['Button was pressed'],
    },
    item: {
      type: 'Text',
      text: 'Press Me',
      color: 'white',
      backgroundColor: 'blue',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
  };
};
