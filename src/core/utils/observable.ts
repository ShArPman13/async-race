type cb = () => void;

export const observable = () => {
  let language = 'en';
  const listeners = new Set();

  return {
    subscribe: (callback: cb) => {
      listeners.add(callback);
    },
    unsubscribe: (callback: cb) => {
      listeners.delete(callback);
    },
    update: (newValue: string) => {
      language = newValue;
      // listeners.forEach((callback) => callback(language));
    },
    getValue: () => language,
  };
};
