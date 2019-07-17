/**
 * @fileoverview This is an externs file.
 * @externs
 */

/* typal types/index.xml externs */
/** @const */
var _multipartForm = {}
/**
 * Options for the constructor.
 * @typedef {{ boundary: (string|undefined) }}
 */
_multipartForm.Config
/**
 * Options for adding files.
 * @typedef {{ type: (string|undefined), noCache: (boolean|undefined), filename: (string|undefined) }}
 */
_multipartForm.AddFileOptions

/* typal types/form.xml externs */
/**
 * Accumulates data in fields and returns the complete body.
 * @interface
 */
_multipartForm.Form
/**
 * Reads and adds the file to the request buffer.
 * @type {function(string, string, !_multipartForm.AddFileOptions)}
 */
_multipartForm.Form.prototype.addFile
/**
 * Adds a key-value pair to the form.
 * @type {function(string, (!Buffer|string))}
 */
_multipartForm.Form.prototype.addSection
/**
 * The data to send.
 * @type {!Buffer}
 */
_multipartForm.Form.prototype.buffer
/**
 * The data to send as utf-8 string.
 * @type {string}
 */
_multipartForm.Form.prototype.data
