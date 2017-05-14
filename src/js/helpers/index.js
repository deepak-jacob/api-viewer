/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

/**
 * Combine will produce one single funciton that will call
 * its arguments one by one.
 *
 * @param {...Function} funcs The functions to combine.
 * @returns {Function} A function obtained by combining the argument functions
 * For example, combine(f, g, h) is identical to doing
 * f(...args); g(...args); g(...args);
 */

export function combine(...actions) {
  return (...args) => {
    actions.map(action => action(...args))
  }
}
