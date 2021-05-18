const ImmutableEventObject = require('../../src/immutableeventobject');

class TestImmutableEventObject extends ImmutableEventObject {
    constructor() {
        super(['foo', 'bar']);
    }
}

module.exports = TestImmutableEventObject;