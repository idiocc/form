const _Form = require('./form')

class Form extends _Form {
  /**
   * Creates a new form instance that maintains a buffer of key-value pairs and files separated by a boundary.
   * @param {_multipartForm.Config} [opts] Options for the constructor.
   * @param {string} [opts.boundary="u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh"] The hard-coded boundary for the requests. Default `u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh`.
   */
  constructor(opts = {}) {
    super(opts)
  }
  /**
   * @param {string} path The path to the file.
   * @param {string} name The name of the field.
   * @param {_multipartForm.AddFileOptions} [options] Options for adding files.
   * @param {string} [options.type="application/octet-stream"] The _Content-Type_ description. Default `application/octet-stream`.
   * @param {boolean} [options.noCache=false] Whether to not cache read files. Default `false`.
   * @param {string} [options.filename] The `filename` property for _Content-Disposition_ description. By default, will be same as the `path` argument.
   */
  addFile(path, name, options = {}) {
    return super.addFile(path, name, options)
  }
  /**
   * The complete data as a string.
   * @returns {string}
   */
  get data() {
    return super.data
  }
  /**
   * Writes the final line to the buffer array and returns the concatenated request body.
   */
  get buffer() {
    return super.buffer
  }
  /**
   * Adds a key-value pair to the form.
   * @param {string} key The key to add.
   * @param {!Buffer|string} value The value for the key.
   */
  addSection(key, value) {
    return super.addSection(key, value)
  }
}

module.exports = Form

/* typal types/index.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_multipartForm.Config} Config Options for the constructor.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _multipartForm.Config Options for the constructor.
 * @prop {string} [boundary="u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh"] The hard-coded boundary for the requests. Default `u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh`.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_multipartForm.AddFileOptions} AddFileOptions Options for adding files.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _multipartForm.AddFileOptions Options for adding files.
 * @prop {string} [type="application/octet-stream"] The _Content-Type_ description. Default `application/octet-stream`.
 * @prop {boolean} [noCache=false] Whether to not cache read files. Default `false`.
 * @prop {string} [filename] The `filename` property for _Content-Disposition_ description. By default, will be same as the `path` argument.
 */
