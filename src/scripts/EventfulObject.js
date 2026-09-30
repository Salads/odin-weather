
class EventfulObject {

	listeners = new Map();
	
	addEventListener(eventName, listener) {
		
		if(listener === null || listener === undefined) {
			throw new Error("listener is null or undefined!");
		}

		let listenerType = typeof listener;
		if(listenerType !== "object" && listenerType !== "function") {
			throw new Error("listener is not an object or function! Was: " + listenerType);
		}
		else if(listenerType === "object" && !listener.handleEvent) {
			throw new Error("listener is object, but does not have handleEvent(event) function!");
		}
		
		if(!this.listeners.has(eventName)) { 
			this.listeners.set(eventName, []); 
		}
		else if(this.listeners.get(eventName).includes(listener)) {
			throw new Error("A listener can only be added once to an event!");
		}

		this.listeners.get(eventName).push(listener);
	}

	removeEventListener(eventName, listener) {
		if(!this.listeners.has(eventName)) return;

		let eventListeners = this.listeners.get(eventName).filter(e => e !== listener);
		if(eventListeners.length) {
			this.listeners.set(eventName, eventListeners);
		}
		else {
			this.listeners.delete(eventName);
		}
	}

	emit(eventName, eventData) {
		if(!this.listeners.has(eventName)) return;

		// NOTE(Salads): Create copy of array to stop new listeners emitting.
		for(let listener of [...this.listeners.get(eventName)]) {
			let listenerType = typeof listener;
			if(listenerType === "function") {
				listener({ type: eventName, data: eventData });
			}
			else if(listenerType === "object" && listener.handleEvent) {
				listener.handleEvent({ type: eventName, data: eventData });
			}
		}
	}

}

export { EventfulObject };