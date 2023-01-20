export type UpdateCallback<T> = (data?: T) => void;

export interface IObserver<T> {
  subscribe: (callback: UpdateCallback<T>) => void;
  unsubscribe: (callback: UpdateCallback<T>) => void;
  update: () => void;
}

export const Observable = <T>() => {
  let data: T;
  const listeners = new Set<UpdateCallback<T>>();

  return {
    subscribe: (callback: UpdateCallback<T>) => {
      listeners.add(callback);
    },
    unsubscribe: (callback: UpdateCallback<T>) => {
      listeners.delete(callback);
    },
    update: (newValue?: T) => {
      if (newValue) {
        data = newValue;
      }
      listeners.forEach((callback) => callback(data));
    },
    getValue: () => data,
  };
};
