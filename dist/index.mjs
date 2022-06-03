// src/index.ts
import { ref } from "vue-demi";
function PiniaLoading({ options, store }) {
  if (options.actions) {
    const $loading = {};
    Object.keys(options.actions).forEach((actionKey) => {
      const originAction = options.actions[actionKey];
      const action = function(...args) {
        const rtn = originAction.apply(this, args);
        if (rtn instanceof Promise) {
          $loading[actionKey] = ref(false);
          return new Promise((resolve, reject) => {
            $loading[actionKey].value = true;
            rtn.then(resolve).catch(reject).finally(() => {
              $loading[actionKey].value = false;
            });
          });
        } else {
          return rtn;
        }
      };
      store[actionKey] = action;
    });
    store.$loading = $loading;
  }
}
export {
  PiniaLoading
};
