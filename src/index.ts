export const isPromise = (p: any): p is Promise<any | void> =>
  !!p &&
  (p instanceof Promise ||
    ((typeof p === 'object' || typeof p === 'function') &&
      typeof p.then === 'function' &&
      typeof p.catch === 'function' &&
      typeof p.finally === 'function'))
