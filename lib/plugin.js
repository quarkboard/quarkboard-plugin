/**
 * Interface for the Plugin infrastructure.
 */
class Plugin {
    constructor(config, quarkboard) {
        this._app = quarkboard;
        this._config = config;
        this._enabled = true;

        this.init();
    }

    html() {}
    init() {}
    load() {}
    scripts() {}
    styles() {}
    unload() {}

    get enabled() {
        return this._enabled;
    }

    set enabled(enabled) {
        this._enabled = enabled;
    }

    /**
     * Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.
     *
     * @see https://nodejs.org/api/events.html#events_emitter_emit_eventname_args
     *
     * @param eventName
     * @param args
     * @returns {Plugin}
     */
    emit(eventName, ...args) {
        this._app.emit(eventName, ...args);
        return this;
    }

    is(clazz) {
        return clazz.name === this.constructor.name;
    }

    /**
     * Adds the {listener} function to the end of the listeners array for the event named {eventName}.
     *
     * @see https://nodejs.org/api/events.html#events_emitter_on_eventname_listener
     *
     * @param eventName
     * @param listener
     * @returns {Plugin}
     */
    on(eventName, listener) {
        this._app.on(eventName, listener);
        return this;
    }

    /**
     * Adds a one-time {listener} function for the event named {eventName}.
     *
     * @see https://nodejs.org/api/events.html#events_emitter_once_eventname_listener
     *
     * @param eventName
     * @param listener
     * @returns {Plugin}
     */
    once(eventName, listener) {
        this._app.once(eventName, listener);
        return this;
    }
}

/**
 * @type {Plugin}
 */
module.exports = Plugin;