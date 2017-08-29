export default function BlockName(name: string): Function {
    function getter() {
        return name;
    }

    return (target: Function): Function => {
        const proto = target.prototype;

        function Constructor () {
            target.apply(<any>this, arguments);
        }

        Constructor.prototype = Object.create(proto);
        Constructor.prototype.constructor = Constructor;

        Object.defineProperty(Constructor.prototype, 'block', {
            get: getter,
            enumerable: true,
            configurable: true
        });

        return Constructor;
    };
}
