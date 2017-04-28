// @ts-check

/**
 * Constructor for Greetings object.
 *
 * @class Grettings
 */
class Grettings {
  /**
   * Pre-defined greeting text.
   *
   * @readonly
   * @static
   * @returns {string} Pre-defined greeting text.
   *
   * @memberOf Grettings
   */
  static get greetingText() {
    return 'Hello World from <%= packageName %>!';
  }

  /**
   * Return greeting text that is pre-defined in the Greeting class.
   *
   * @static
   * @returns {string} Returns pre-defined text within the class.
   *
   * @memberOf Grettings
   */
  static init() {
    return Grettings.greetingText;
  }
}

module.exports = Greetings.init;
