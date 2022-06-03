import { PiniaPluginContext } from 'pinia';
import { Ref } from 'vue-demi';

declare function PiniaLoading({ options, store }: PiniaPluginContext): void;
declare module 'pinia' {
    interface PiniaCustomProperties<Id, S, G, A> {
        $loading: {
            [K in keyof A as A[K] extends () => Promise<any> ? K : never]: Ref<Boolean>;
        };
    }
}

export { PiniaLoading };
