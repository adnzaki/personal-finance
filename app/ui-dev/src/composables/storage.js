class LocalStorageHelper {
  /**
   * Construct a new LocalStorageHelper instance.
   *
   * @param {string} key
   * The key to use in the local storage.
   *
   * @throws {Error}
   * If key is not provided.
   */
  constructor(key) {
    if (!key) throw new Error('Key must be provided!')
    this.key = key
  }

  /**
   * Set the value in local storage.
   *
   * @param {*} value
   * The value to be saved in local storage.
   *
   * @throws {Error}
   * If the value cannot be saved.
   */
  set(value) {
    try {
      localStorage.setItem(this.key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save data:', error)
    }
  }

  /**
   * Retrieve the value from local storage.
   *
   * @param {*} defaultValue
   * The default value to be returned if the data does not exist or
   * if an error occurs.
   *
   * @returns {*}
   * The retrieved value, or the default value if an error occurs.
   */
  get(defaultValue = null) {
    try {
      const data = localStorage.getItem(this.key)
      return data !== null ? JSON.parse(data) : defaultValue
    } catch (error) {
      console.error('Failed to retrieve data:', error)
      return defaultValue
    }
  }

  /**
   * Remove the stored value from local storage.
   */

  remove() {
    localStorage.removeItem(this.key)
  }

  /**
   * Check if a value exists in local storage for the specified key.
   *
   * @returns {boolean}
   * True if a value exists, otherwise false.
   */

  has() {
    return localStorage.getItem(this.key) !== null
  }

  /**
   * Append a value to the stored array in local storage.
   *
   * @param {*} value
   * The value to be appended. If the value is an object with a 'value'
   * property, it will be checked for existence in the stored array before
   * being appended.
   *
   * @throws {Error}
   * If the stored data is not an array, or if an error occurs while
   * appending the value.
   */
  append(value) {
    try {
      let data = this.get([])

      if (!Array.isArray(data)) {
        console.error('Stored data is not an array, cannot append value.')
        return
      }

      if (typeof value === 'object' && value !== null && 'value' in value) {
        const exists = data.some((item) => item.value === value.value)
        if (exists) {
          console.warn('Item with this value already exists, not added.')
          return
        }
      }

      data.push(value)
      this.set(data)
    } catch (error) {
      console.error('Failed to append data:', error)
    }
  }

  /**
   * Get the item at the specified index from the stored array in local storage.
   *
   * @param {number} index
   * The index of the item to be retrieved.
   *
   * @returns {*}
   * The item at the specified index, if it exists, or null if it does not.
   *
   * @throws {Error}
   * If the stored data is not an array, or if an error occurs while
   * retrieving the item.
   */
  getAt(index) {
    try {
      const data = this.get([])

      if (!Array.isArray(data)) {
        console.error('Stored data is not an array, cannot get by index.')
        return null
      }

      return index >= 0 && index < data.length ? data[index] : null
    } catch (error) {
      console.error('Failed to get data by index:', error)
      return null
    }
  }

  /**
   * Filters the stored array with the given predicate function.
   *
   * @param {function} predicate
   * The function to be used as the predicate for the filter.
   *
   * @returns {array}
   * The filtered array.
   *
   * @throws {Error}
   * If the stored data is not an array, or if an error occurs while
   * filtering the data.
   */
  filter(predicate) {
    try {
      const data = this.get([])
      if (!Array.isArray(data)) {
        console.error('Stored data is not an array, cannot filter.')
        return []
      }

      return data.filter(predicate)
    } catch (error) {
      console.error('Failed to filter data:', error)
      return []
    }
  }
}

export default LocalStorageHelper
