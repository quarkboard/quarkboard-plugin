const path = require('path');

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

    /**
     * Compile the HTML document for the plugin.
     *
     * @param document
     * @param window
     */
    html(document, window) {}

    /**
     * This method is run when the plugin is first constructed; in fact, use this instead of the constructor.
     */
    init() {}

    /**
     * This method is run after the plugin is initialized and when the application is run.
     */
    load() {}

    /**
     * Compile the HTML document scripts for the plugin.
     *
     * @returns {array}
     */
    scripts() { return []; }

    /**
     * Compile the HTML document stylesheets for the plugin.
     *
     * @returns {array}
     */
    styles() { return []; }

    /**
     * This method is run when the plugin is being unloaded.
     */
    unload() {}

    /**
     * Return the Quarkboard instance.
     *
     * @returns {Quarkboard}
     */
    get app() {
        return this._app;
    }

    /**
     * Return the Quarkboard configuration.
     *
     * @returns {object}
     */
    get config() {
        return this._config;
    }

    /**
     * Return the data structure for the plugin directories.
     *
     * @returns {{css: string, images: string, js: string}}
     */
    get directories() {
        const pluginRoot = this._config.pluginRoot;
        const directories = this._config.pjson.directories;

        return typeof directories !== 'undefined' ? {
            js: path.join(pluginRoot, directories.js),
            css: path.join(pluginRoot, directories.css),
            images: path.join(pluginRoot, directories.images),
        } : {};
    }

    /**
     * Return whether or not the plugin is enabled.
     *
     * @returns {boolean}
     */
    get enabled() {
        return this._enabled;
    }

    /**
     * Return the name of the plugin.
     *
     * @returns {string}
     */
    get name() {
        return this._config.pluginName;
    }

    /**
     * Toggle the enabled state of the plugin.
     *
     * @param {boolean} enabled
     */
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

    /**
     * Return whether or not {plugin} is a version of the concrete class.
     *
     * @param {object} plugin
     * @returns {boolean}
     */
    is(plugin) {
        return plugin.constructor.name === this.constructor.name;
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
