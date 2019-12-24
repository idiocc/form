const _Form = require('./form')

/**
 * Accumulates data in fields and returns the complete body.
 */
class Form extends _Form {
  /**
   * Creates a new form instance that maintains a buffer of key-value pairs and files separated by a boundary.
   * @param {!_multipart.FormConfig} config Options for the constructor.
   * @param {string} [config.boundary="u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh"] The hard-coded boundary for the requests. Default `u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh`.
   */
  constructor(config) {
    super(config)
  }
  /**
   * Reads and adds the file to the request buffer.
   * @param {string} path The path to the file to read and add.
   * @param {string} name The filename.
   * @param {!_multipart.AddFileOptions} [options] Options for adding files.
   * @param {string} [options.type="application/octet-stream"] The _Content-Type_ description. Default `application/octet-stream`.
   * @param {boolean} [options.noCache=false] Whether to not cache read files. Default `false`.
   * @param {string} [options.filename] The `filename` property for _Content-Disposition_ description. By default, will be same as the `path` argument.
   */
  addFile(path, name, options) {
    return super.addFile(path, name, options)
  }
  /**
   * Adds a key-value pair to the form.
   * @param {string} key The key to add.
   * @param {(!Buffer|string)} value The value.
   */
  addSection(key, value) {
    return super.addSection(key, value)
  }
}

module.exports = Form

/* typal types/index.xml namespace */
/**
 * @typedef {_multipart.FormConfig} FormConfig Options for the constructor.
 * @typedef {Object} _multipart.FormConfig Options for the constructor.
 * @prop {string} [boundary="u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh"] The hard-coded boundary for the requests. Default `u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh`.
 * @typedef {_multipart.AddFileOptions} AddFileOptions Options for adding files.
 * @typedef {Object} _multipart.AddFileOptions Options for adding files.
 * @prop {string} [type="application/octet-stream"] The _Content-Type_ description. Default `application/octet-stream`.
 * @prop {boolean} [noCache=false] Whether to not cache read files. Default `false`.
 * @prop {string} [filename] The `filename` property for _Content-Disposition_ description. By default, will be same as the `path` argument.
 */
