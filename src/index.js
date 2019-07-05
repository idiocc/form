import { readBuffer } from '@wrote/read'

export default class Form {
  /**
   * Creates a new form instance that maintains a buffer of key-value pairs and files separated by a boundary.
   * @param {Config} [opts] Options for the constructor.
   * @param {string} [opts.boundary="u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh"] The hard-coded boundary for the requests. Default `u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh`.
   */
  constructor(opts = {}) {
    const {
      boundary = 'u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh',
    } = opts
    /**
     * @type {!Array<!Buffer>}
     */
    this._data = []
    this._boundary = boundary
  }
  /**
   * @param {string} path The path to the file.
   * @param {string} name The name of the field.
   * @param {AddFileOptions} [options] Options for adding files.
   * @param {string} [options.type="application/octet-stream"] The _Content-Type_ description. Default `application/octet-stream`.
   * @param {boolean} [options.noCache=false] Whether to not cache read files. Default `false`.
   * @param {string} [options.filename] The `filename` property for _Content-Disposition_ description. By default, will be same as the `path` argument.
   */
  async addFile(path, name, options = {}) {
    const {
      contentType = 'application/octet-stream',
      noCache = false,
      filename = path,
    } = options
    let file
    if (path in formCache || noCache) {
      file = formCache[path]
    } else {
      file = await readBuffer(path)
      if (!noCache) formCache[path] = file
    }
    const disposition = [
      'form-data',
      `name="${name}"`,
      `filename="${filename}"`,
    ].join('; ')
    this.writeLine(`\r\n--${this.boundary}`)
    this.writeLine(`Content-Disposition: ${disposition}`)
    this.writeLine(`Content-Type: ${contentType}`)
    this.writeLine()
    this._data.push(file)
  }
  writeLine(line) {
    if (line) this._data.push(typeof line == 'string' ? Buffer.from(line) : line)
    this._data.push(Buffer.from('\r\n'))
  }
  /**
   * The boundary.
   */
  get boundary() {
    return this._boundary
  }
  /**
   * The complete data as a string.
   */
  get data() {
    this.writeLine(`\r\n--${this.boundary}--`)

    return Buffer.concat(this._data).toString()
  }
  /**
   * Adds a key-value pair to the form.
   * @param {string} key The key to add.
   * @param {string} value The value for the key.
   */
  addSection(key, value) {
    this.writeLine(`\r\n--${this.boundary}`)
    this.writeLine(`Content-Disposition: form-data; name="${key}"`)
    this.writeLine()
    this._data.push(Buffer.from(value))
  }
}

const formCache = {}

/* typal types/index.xml */
/**
 * @typedef {Object} Config Options for the constructor.
 * @prop {string} [boundary="u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh"] The hard-coded boundary for the requests. Default `u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh`.
 * @typedef {Object} AddFileOptions Options for adding files.
 * @prop {string} [type="application/octet-stream"] The _Content-Type_ description. Default `application/octet-stream`.
 * @prop {boolean} [noCache=false] Whether to not cache read files. Default `false`.
 * @prop {string} [filename] The `filename` property for _Content-Disposition_ description. By default, will be same as the `path` argument.
 */
