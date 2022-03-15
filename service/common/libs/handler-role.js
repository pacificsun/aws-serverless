import middy from '@middy/core';

const asyncValidator = () => {
  before: (handler) => {
    if (handler.event.body) {
      return someAsyncStuff(handler.event.body).then(() => {
        return { foo: bar };
      });
    }

    return Promise.resolve();
  };
};

export default (handler) => middy(handler).use([asyncValidator()]);
