/**
 * Returns a random integer between the provided minimum and maximum values.
 *
 * @param {number} min - Inclusive minimum value.
 * @param {number} max - Inclusive maximum value.
 * @returns {number}
 */
export function randomInteger(min, max) {
    const lowerBound = Math.ceil(min);
    const upperBound = Math.floor(max);

    return Math.floor(
        Math.random() * (upperBound - lowerBound + 1)
    ) + lowerBound;
}

/**
 * Returns a DOM element by its id.
 *
 * @param {string} id
 * @returns {HTMLElement}
 * @throws {Error} If the element cannot be found.
 */
export function getElement(id) {
    const element = document.getElementById(id);

    if (!element) {
        throw new Error(`Element with id "${id}" was not found.`);
    }

    return element;
}

/**
 * Removes all child nodes from an element.
 *
 * @param {HTMLElement} element
 */
export function clearElement(element) {
    element.replaceChildren();
}

/**
 * Creates a DOM element.
 *
 * @param {string} tagName
 * @param {Object} [options]
 * @param {string} [options.className]
 * @param {string} [options.text]
 *
 * @returns {HTMLElement}
 */
export function createElement(tagName, options = {}) {
    const element = document.createElement(tagName);

    if (options.className) {
        element.className = options.className;
    }

    if (options.text) {
        element.textContent = options.text;
    }

    return element;
}