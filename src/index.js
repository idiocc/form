import { readBuffer } from '@wrote/read'
import Debug from '@idio/debug'

const debug=Debug('@multipart/form')

/**
 * @implements {_multipart.Form}
 */
export default class Form {
  /**
   * Creates a new form instance that maintains a buffer of key-value pairs and files separated by a boundary.
   * @param {_multipart.FormConfig} [opts] Options for the constructor.
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
   * @param {_multipart.AddFileOptions} [options] Options for adding files.
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
  writeLine(line = null, encoding = 'utf8') {
    if (line)
      this._data.push(typeof line == 'string' ? Buffer.from(line, encoding) : line)

    this._data.push(Buffer.from('\r\n', encoding))
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
    let b = this.buffer
    debug('converting to string')
    b = b.toString()
    debug('string is %f', b.length)
    return b
  }
  /**
   * The complete data as Buffer.
   */
  get buffer() {
    debug('adding final --boundary-- and calling Buffer.concat')
    this.writeLine(`\r\n--${this.boundary}--`)

    let b= Buffer.concat(this._data)
    debug('buffer is %f', b.length)
    return b
  }
  /**
   * Adds a key-value pair to the form.
   * @param {string} key The key to add.
   * @param {!Buffer|string} value The value for the key.
   */
  addSection(key, value) {
    this.writeLine(`\r\n--${this.boundary}`)
    this.writeLine(`Content-Disposition: form-data; name="${key}"`)
    this.writeLine()
    this._data.push(value instanceof Buffer ? value : Buffer.from(value))
  }
}

const formCache = {}

/* typal types/index.xml closure */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_multipart.Config} Config Options for the constructor.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _multipart.Config Options for the constructor.
 * @prop {string} [boundary="u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh"] The hard-coded boundary for the requests. Default `u2KxIV5yF1y+xUspOQCCZopaVgeV6Jxihv35XQJmuTx8X3sh`.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_multipart.AddFileOptions} AddFileOptions Options for adding files.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _multipart.AddFileOptions Options for adding files.
 * @prop {string} [type="application/octet-stream"] The _Content-Type_ description. Default `application/octet-stream`.
 * @prop {boolean} [noCache=false] Whether to not cache read files. Default `false`.
 * @prop {string} [filename] The `filename` property for _Content-Disposition_ description. By default, will be same as the `path` argument.
 */
