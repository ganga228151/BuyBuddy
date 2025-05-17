export const checkEmpty = (...args) => {
    return args.every(arg => arg !== "" && arg !== null && arg !== undefined);
  };
  