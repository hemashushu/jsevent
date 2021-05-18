const TestEventObject = require('./implements/testeventobject');

const assert = require('assert/strict')

describe('AbstractEventObject Test', ()=>{

    it('Test addEventListener/dispatch', (done)=>{
        let eventObject1 = new TestEventObject();

        eventObject1.addEventListener('test', (args)=>{
            assert.equal(args.name1, 'value1');
            assert.equal(args.name2, 'value2');

            done();
        });

        eventObject1.dispatch('test', {
            name1: 'value1',
            name2: 'value2'
        });
    });

    it('Test multiple addEventListener/dispatch', ()=>{
        let eventObject1 = new TestEventObject();

        let count_a = 0;
        let count_b = 0;

        eventObject1.addEventListener('foo', (args)=>{
            count_a+=1;
        });

        eventObject1.addEventListener('foo', (args)=>{
            count_a+=10;
        });

        eventObject1.addEventListener('foo', (args)=>{
            count_a+=100;
        });

        eventObject1.addEventListener('bar', (args)=>{
            count_b+=2;
        });

        eventObject1.addEventListener('bar', (args)=>{
            count_b+=20;
        });

        eventObject1.addEventListener('bar', (args)=>{
            count_b+=200;
        });

        eventObject1.dispatch('foo');
        eventObject1.dispatch('bar');
        eventObject1.dispatch('foo');
        eventObject1.dispatch('bar');
        eventObject1.dispatch('foo');
        eventObject1.dispatch('bar');

        assert.equal(count_a, 333);
        assert.equal(count_b, 666);
    });

});

