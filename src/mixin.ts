const mixinHooks = [
    'constructor',
    'block',
    'defaultParams',
    '_getProp',
    '_extendProp'
];

export default function mixin(target: Function, ...mixins: any[]): void {
    mixins.forEach((mixin) => {
        const proto = typeof mixin === 'function' ? mixin.prototype : mixin;

        Object.getOwnPropertyNames(proto).forEach((key) => {
            if (mixinHooks.indexOf(key) >= -1) {
                return;
            }

            target.prototype[key] = mixin[key];
        });
    });
}
