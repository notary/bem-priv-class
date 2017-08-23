import extend from '../src/extend';
import {assert} from 'chai';

describe('extend()', () => {
    it('must return extended object', () => {
        let obj1 = {
            prop1: 1,
            prop2: 2,
            prop3: 3
        };

        let obj2 = {
            prop2: 4,
            prop5: {
                key: 'value'
            }
        };

        assert.deepEqual(extend(obj1, obj2), {
            prop1: 1,
            prop3: 3,
            prop2: 4,
            prop5: {
                key: 'value'
            }
        });
    });
});
