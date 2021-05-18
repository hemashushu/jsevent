const {IllegalArgumentException} = require('jsexception');

const AbstractEventObject = require('./abstracteventobject');

/**
 * 一个事件名称数组固定的事件对象。
 *
 * 继承此对象除了拥有 AbstractEventObject 的特性，还能限制调用者
 * 注册事件的名称、限制触发对象的名称，用于减少因为事件名称笔误而引入的 BUG。
 */
class ImmutableEventObject extends AbstractEventObject {

    /**
     * 指定当前对象允许的事件的名称（数组），该名称数组
     * 以外的名称都是不允许注册、不允许触发的。
     *
     * @param {*} eventNames 事件名称数组
     */
	constructor(eventNames) {
		super();
		this.eventNameSet = new Set(eventNames);
	}

	addEventListener(eventName, listener) {
        // 检查 eventName 是否允许的事件名称
		if (!this.eventNameSet.has(eventName)) {
			throw new IllegalArgumentException(`Event ${eventName} not found.`);
		}

		super.addEventListener(eventName, listener);
	}


	dispatch(eventName, args) {
		if (!this.eventNameSet.has(eventName)) {
			throw new IllegalArgumentException(`Event ${eventName} not found.`);
		}

		super.dispatch(eventName, args);
	}
}

module.exports = ImmutableEventObject;