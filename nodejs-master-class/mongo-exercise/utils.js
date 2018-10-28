/**
 * @param {*} element Element to check
 * @returns {boolean} true if element is Null or Undefined / false otherwise
 */
const isNil = (element) => element == null

/**
 * Returns a new object with only NotNil properties.
 * Performs the check recursively.
 *
 * Notice:
 * - `undefined` or `null` elements inside an Array will be kept.
 * - Object elements inside an Array will also be cleaned.
 * - If something that is not an array or an object is passed, it's returned as is.
 *
 * @param {*} obj Object to clean up
 * @returns {*} Object with NotNill properties
 */
const pickNotNil = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((element) => pickNotNil(element))
  }

  if (typeof obj !== 'object' || isNil(obj)) {
    return obj
  }

  const keys = Object.keys(obj)
  let copy = {}
  keys.filter((key) => !isNil(obj[key])).forEach((key) => {
    copy[key] = pickNotNil(obj[key])
  })
  return copy
}



module.exports = {
	isNil,
	pickNotNil
}