/**
 * @fileoverview This is an externs file.
 * @externs
 */

/* typal types/index.xml externs */
/** @const */
var _multipart = {}
/**
 * Options for the constructor.
 * @typedef {{ boundary: (string|undefined) }}
 */
_multipart.FormConfig
/**
 * Options for adding files.
 * @typedef {{ type: (string|undefined), noCache: (boolean|undefined), filename: (string|undefined) }}
 */
_multipart.AddFileOptions

/* typal types/form.xml externs */
/**
 * Accumulates data in fields and returns the complete body.
 * Creates a new form instance that maintains a buffer of key-value pairs and files separated by a boundary.
 * @param {!_multipart.FormConfig} config The configuration object.
 * @interface
 */
_multipart.Form = function(config) {}
/**
 * The data to send.
 * @type {!Buffer}
 */
_multipart.Form.prototype.buffer
/**
 * The data to send as utf-8 string. Concatenates the buffer data with `\r\n` and adds the final `--{boundary}--` to the returned string.
 * @type {string}
 */
_multipart.Form.prototype.data
/**
 * Reads and adds the file to the request buffer.
 * @param {string} path The path to the file to read and add.
 * @param {string} name The filename.
 * @param {!_multipart.AddFileOptions=} [options] The options.
 */
_multipart.Form.prototype.addFile = function(path, name, options) {}
/**
 * Adds a key-value pair to the form.
 * @param {string} key The key to add.
 * @param {(!Buffer|string)} value The value.
 */
_multipart.Form.prototype.addSection = function(key, value) {}
