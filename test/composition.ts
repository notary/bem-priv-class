///<reference path="../src/composition.ts"/>
import {Block} from '../src/index';
import {assert} from 'chai';
import BlockName from '../src/blockName';

describe('composition', () => {
    it('json is return correct bemjson', () => {
        class Composition1 extends Block {
            public json(): object {
                this.mods['composition1Mods'] = 'yes';
                this.content.push({
                    block: this.block
                });
                return this._bemjson;
            }
        }

        @BlockName('testComposition')
        class Composition2 extends Block {
            public json(): object {
                this.content.push({
                    block: this.block
                });

                return this._bemjson;
            }
        }

        class MyComp extends Block {
            public get defaultParams(): object {
                return {};
            };

            public json(): object {
                super.json();

                this.mix = [{block: 'test'}, {block: 'test2'}];
                this.params = {
                    live: false,
                    data: {
                        testData: 50
                    }
                };

                this.mods['test'] = true;

                return this._bemjson;
            }
        }

        const myComp = new MyComp();
        myComp.addComposition(new Composition1());
        myComp.addComposition(new Composition2());

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
            content: [
                {
                    block: 'composition1'
                },
                {
                    block: 'testComposition'
                }
            ],
            mods: {
                composition1Mods: 'yes',
                test: true
            },
            prop1: 1,
            prop2: 2,
            prop3: 3
        });
    })
});
