const {IllegalArgumentException} = require('jsexception');
const TestImmutableEventObject = require('./implements/testimmutableeventobject');

const assert = require('assert/strict')

describe('ImmutableEventObject Test', ()=>{

    it('Test addEventListener/dispatch', ()=>{
        let eventObject1 = new TestImmutableEventObject();

        let fooCount = 0;
        let barCount = 0;

        eventObject1.addEventListener('foo', (args)=>{
            fooCount++;
        });

        eventObject1.addEventListener('bar', (args)=>{
            barCount++;
        });

        try{
            eventObject1.addEventListener('test', (args)=>{
                fooCount++;
                barCount++;
            });
            assert.fail();

        }catch(err) {
            assert(err instanceof IllegalArgumentException);
        }

        eventObject1.dispatch('foo');
        eventObject1.dispatch('bar');

        try{
            eventObject1.dispatch('test');
            assert.fail();
        }catch(err) {
            assert(err instanceof IllegalArgumentException);
        }
    });
});
