import stringifyObject from 'stringify-object';

function printLine(line) {
  const key = Object.keys(line)[0];

  const msgs = line[key]
    .map(
      msg =>
        typeof msg === 'string'
          ? msg
          : stringifyObject(msg, { indent: '  ', inlineCharacterLimit: 80 })
    )
    .join(', ');

  const indentedKey = key
    .split('')
    .map(letter => (letter === '_' ? '  ' : letter))
    .join('');

  return `${indentedKey} ${msgs}`;
}

export default printLine;
