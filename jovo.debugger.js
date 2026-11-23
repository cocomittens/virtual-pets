const { DebuggerConfig } = require('@jovotech/plugin-debugger');

const intent = (label, name, entities) => ({
  label,
  input: { intent: name, ...(entities ? { entities } : {}) },
});

const debuggerConfig = new DebuggerConfig({
  locales: ['en'],
  buttons: [
    { label: 'LAUNCH', input: { type: 'LAUNCH' } },
    intent('Play a game', 'PlayGameIntent'),
    intent('Feed', 'FeedIntent'),
    intent('Shop', 'ShoppingIntent'),
    intent('Menu', 'MenuIntent'),
    intent('Hint', 'HintIntent'),
    intent('Yes', 'YesIntent'),
    intent('No', 'NoIntent'),
    intent('Stop', 'END'),
  ],
});

module.exports = debuggerConfig;
