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
   * @returns {*}
   * The retrieved value, or the default value if an error occurs.
   */
  get() {
    const data = localStorage.getItem(this.key)
    return data ? JSON.parse(data) : null
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
    let data = this.get()

    if (!Array.isArray(data)) {
      console.warn(
        `Data in localStorage key "${this.key}" is not an array. Resetting to an empty array.`,
      )
      data = []
    }

    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      console.error(
        'Only objects can be added. Strings, numbers, or arrays are not allowed.',
      )
      return
    }

    const exists = data.some(
      (item) => JSON.stringify(item) === JSON.stringify(value),
    )
    if (exists) {
      console.warn('Item already exists, not added.')
      return
    }

    data.push(value)
    this.set(data)
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
  getByIndex(index) {
    const data = this.get()
    if (!Array.isArray(data)) {
      console.error(`Data in localStorage key "${this.key}" is not an array.`)
      return null
    }

    if (index < 0 || index >= data.length) {
      console.warn('Index out of bounds.')
      return null
    }

    return data[index]
  }

  /**
   * Filters the stored array with the given predicate function.
   *
   * @param {function} callback
   * The function to be used as the predicate for the filter.
   *
   * @returns {array}
   * The filtered array.
   *
   * @throws {Error}
   * If the stored data is not an array, or if an error occurs while
   * filtering the data.
   */
  filter(callback) {
    const data = this.get()
    if (!Array.isArray(data)) {
      console.error(`Data in localStorage key "${this.key}" is not an array.`)
      return []
    }

    return data.filter(callback)
  }
}

export default LocalStorageHelper
