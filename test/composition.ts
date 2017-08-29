///<reference path="../src/composition.ts"/>
import {Block} from '../src/index';
import {Composition, IBemJson} from '../src/composition';
import {assert} from 'chai';
import BlockName from '../src/blockName';

describe('bem-priv-component', () => {
    it('json is return correct bemjson', () => {
        class Composition1 extends Composition {
            prepareBemJson(): void {
                this._bemjson['mods'].composition1Mods = 'yes';
            }
        }

        @BlockName('testComposition')
        class Composition2 extends Block {
            public get defaultParams(): object {
                return {};
            };

            prepareBemJson(): void {
                this.content.push({
                    block: this.block
                });
            }
        }

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
        myComp.addComposition(new Composition1());
        myComp.addComposition(new Composition2());

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
            content: [
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
