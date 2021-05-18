const {IllegalArgumentException} = require('jsexception');

/**
 * 抽象带有事件的对象
 *
 * 如果想让某个对象拥有事件功能（注册监听者、触发事件等），则可以让那个
 * 对象继承于这个抽象类。
 */
class AbstractEventObject {

	constructor() {
        // 事件监听者 Map
        this.eventListenerMap = new Map();
	}

    /**
     * 添加事件监听者
     *
     * 事件监听者是一个方法，方法的签名为：
     * function(eventArgs: object){...}
     *
     * @param {*} eventName
     * @param {*} listener
     */
	addEventListener(eventName, listener) {
        if (typeof(eventName) !== 'string' || eventName === '') {
            throw new IllegalArgumentException('Event name can not be empty.');
        }

        if (typeof(listener) !== 'function') {
            throw new IllegalArgumentException('listener should be a function.');
        }

        let listeners = this.eventListenerMap.get(eventName);

        if (listeners === undefined) {
            listeners = [listener];
            this.eventListenerMap.set(eventName, listeners);

        }else {
            listeners.push(listener);
        }
	}

    /**
     * 触发一个事件
     *
     * 示例：
     * someEventObject.dispatch('someEventName', {
     *      argName1: value1,
     *      argName2: value2,
     *      ...
     * });
     *
     * @param {*} eventName
     * @param {*} args
     */
	dispatch(eventName, args) {
        if (typeof(eventName) !== 'string' || eventName === '') {
            throw new IllegalArgumentException('Event name can not be empty.');
        }

        let listeners = this.eventListenerMap.get(eventName);
        if (listeners !== undefined) {
            for(let listener of listeners) {
                listener(args);
            }
        }
	}
}

module.exports = AbstractEventObject;