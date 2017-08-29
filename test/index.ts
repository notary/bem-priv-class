import {Block} from '../src/index';
import {assert} from 'chai';

describe('bem-priv-component', () => {
    it('mods get and set must work correctly', () => {
        class MyComp extends Block {
            public get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.mods = {
                    "test": 2
                };
            }
        }

        const myComp = new MyComp();

        assert.strictEqual(myComp.mods['test'], 2);
    });

    it('attrs get and set must work correctly', () => {
        class MyComp extends Block {
            public get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.attrs = {
                    "test": 2
                };
            }
        }

        const myComp = new MyComp();

        assert.strictEqual(myComp.attrs['test'], 2);
    });

    it('params get and set must work correctly', () => {
        class MyComp extends Block {
            public get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.params = {
                    "test": 2
                };
            }
        }

        const myComp = new MyComp();

        assert.strictEqual(myComp.params['test'], 2);
    });

    it('content get and set must work correctly', () => {
        class MyComp extends Block {
            public get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.content = {
                    "test": 2
                };
            }
        }

        const myComp = new MyComp();

        assert.strictEqual(myComp.content['test'], 2);
    });

    it('mix get and set must work correctly', () => {
        const mix = [{block: 'a'}, {block: 'b'}];

        class MyComp extends Block {
            public get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.mix = mix;
            }
        }

        const myComp = new MyComp();

        assert.strictEqual(myComp.mix, mix);
    });

    it('addMods must work correctly', () => {
        class MyComp extends Block {
            public get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.mods = {
                    test: 2
                };
            }
        }

        const myComp = new MyComp();

        myComp.addMods({
            test2: 50
        });

        assert.deepEqual(myComp.mods, {test: 2, test2: 50});
    });

    it('addAttrs must work correctly', () => {
        class MyComp extends Block {
            public get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.attrs = {
                    "test": 2
                };
            }
        }

        const myComp = new MyComp();

        myComp.addAttrs({
            test2: 50
        });

        assert.deepEqual(myComp.attrs, {test: 2, test2: 50});
    });

    it('addMix must work correctly', () => {
        const mix = [{block: 'a'}, {block: 'b'}];
        const addedMix = [{test: 50}];
        const addedMix2 = {test2: 60};

        class MyComp extends Block {
            public get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.mix = mix;
            }
        }

        const myComp = new MyComp();

        myComp.addMix(addedMix);
        myComp.addMix(addedMix2);

        assert.deepEqual(myComp.mix, [{block: 'a'}, {block: 'b'}, {test: 50}, {test2: 60}]);
    });

    it('json is return correct bemjson', () => {
        class MyComp extends Block {
            public get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.mix = [{block: 'test'}, {block: 'test2'}];
                this.params = {
                    live: false,
                    data: {
                        testData: 50
                    }
                };
                this.mods = {
                    test: true
                };
            }
        }

        const myComp = new MyComp();

        myComp.addProps({
            prop1: 1,
            prop2: 2,
            prop3: 3
        });

        assert.deepEqual(myComp.json, {
            block: 'mycomp',
            mix: [{block: 'test'}, {block: 'test2'}],
            js: {
                live: false,
                data: {
                    testData: 50
                }
            },
            mods: {
                test: true
            },
            prop1: 1,
            prop2: 2,
            prop3: 3
        });
    })
});
