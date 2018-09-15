/**
 * Return a copy of the passed object
 * @param {Object} obj The Js object to clone
 * @returns {Object} The cloned object
 */
function cloneObject(obj) {
  const clone = Object.create(obj);
  Object.assign(clone, obj);
  return clone;
}

module.exports = cloneObject;
