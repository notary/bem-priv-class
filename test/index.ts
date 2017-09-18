import { Block } from '../src/index';
import { assert } from 'chai';

describe('bem-priv-class', () => {
    it('mods get and set must work correctly', () => {
        class MyComp extends Block {
            protected get defaultParams(): object {
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
            protected get defaultParams(): object {
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
            protected get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.js = {
                    "test": 2
                };
            }
        }

        const myComp = new MyComp();

        assert.strictEqual(myComp.js['test'], 2);
    });

    it('content get and set must work correctly', () => {
        class MyComp extends Block {
            protected get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.content = [{
                    "test": 2
                }];
            }
        }

        const myComp = new MyComp();

        assert.strictEqual(myComp.content[0]['test'], 2);
    });

    it('mix get and set must work correctly', () => {
        const mix = [{block: 'a'}, {block: 'b'}];

        class MyComp extends Block {
            protected get defaultParams(): object {
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
            protected get defaultParams(): object {
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

        assert.deepEqual(myComp.mods, {test: 2});
    });

    it('addAttrs must work correctly', () => {
        class MyComp extends Block {
            protected get defaultParams(): object {
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

        assert.deepEqual(myComp.attrs, {test: 2});
    });

    it('addMix must work correctly', () => {
        const mix = [{block: 'a'}, {block: 'b'}];
        const addedMix = {test: 50};
        const addedMix2 = {test2: 60};

        class MyComp extends Block {
            protected get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.mix = mix;
            }
        }

        const myComp = new MyComp();

        myComp.mix.push(addedMix);
        myComp.mix.push(addedMix2);

        assert.deepEqual(myComp.mix, [{block: 'a'}, {block: 'b'}, {test: 50}, {test2: 60}]);
    });

    it('js must work correctly', () => {
        const js = {
            live: false,
            data: {
                testData: 50
            }
        };

        class MyComp extends Block {
            constructor() {
                super();

                this.js = js;
            }
        }

        const myComp = new MyComp();

        assert.deepEqual(myComp.js, js);
    });

    it('json is return correct bemjson', () => {
        class MyComp extends Block {
            protected get defaultParams(): object {
                return {};
            };

            constructor() {
                super();

                this.mix = [{block: 'test'}, {block: 'test2'}];
                this.js = {
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

        assert.deepEqual(myComp.json(), {
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
    });

    it.only('createBlock', () => {
        class Block1 extends Block {

        }
        class Block2 extends Block {}
        class Block3 extends Block {}
        class Block11 extends Block {}

        class BaseBlock extends Block{

            public json() {
                super.json();
                this.js = this.params;

                return this._bemjson;
            }
        }

        const json = Block.createBlock(
            BaseBlock,
            {},
            Block.createBlock(
                Block2,
                {}
            ),
            Block.createBlock(
                Block1,
                {},
                Block.createBlock(
                    Block11,
                    {}
                )
            ),
            Block.createBlock(
                Block3,
                {}
            )
        ).json();

        console.log('bemjson:', JSON.stringify(json));
    });
});
