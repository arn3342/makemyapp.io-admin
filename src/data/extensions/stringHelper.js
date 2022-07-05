export const StringHelper = {
  /**
   *
   * @param {*} str Can be a string or an `array` of string
   * @returns True if the string(or any string from the given array) is empty, undefined, or whitespaces-only.
   */
  isEmpty (str) {
    if (Array.isArray(str)) {
      return str.some(st => !st && !st.trim())
    }
    return !str && !str.trim()
  },
  /**
   *
   * @param {*} obj The object to run the query on
   * @param {*} ignorePropName Name of the property/object key to ignore
   * @returns True if any properties of the given object is `null`, `undefined`, `empty` (in case of strings), or `length == 0` (in case of arrays)
   */
  isPropsEmpty (obj = {}, ignorePropName = '') {
    return Object.keys(obj).some(prop => {
      if (prop !== ignorePropName) {
        return !obj[prop] && !obj[prop].trim()
      }
    })
  },
  isSame (strings = []) {
    return strings.every(str => str === strings[0])
  }
}
