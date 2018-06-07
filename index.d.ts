declare function makeConsoleMock(
  nativeConsole?: Console
): {
  history: () => Array<{ [key: string]: any[] }>;
  printHistory: () => string;
  clearHistory: () => void;
  print: (...args: any[]) => void;
  group: (...title: any[]) => void;
  groupEnd: () => void;
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
};

export default makeConsoleMock;
