/**
 * Object with constants for API filtering for DB models
 * @type {{}}
 */

module.exports = {
  EQUAL: 'EQUAL', // sql operator =
  LIKE: 'LIKE', // sql operator LIKE
  IN: 'IN', // for array, sql operator IN
  ML: 'ML', // multi language fields, sql operator LIKE
  EQUAL_OPTION: 'EQUAL_OPTION' // option for select2,  sql operator =
}
