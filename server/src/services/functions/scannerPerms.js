// @ts-check
const config = require('config')

const scanner = config.getSafe('scanner')

/**
 *
 * @param {string[]} roles
 * @param {'discord' | 'telegram'} provider
 * @param {boolean} [trialActive]
 * @returns
 */
function scannerPerms(roles, provider, trialActive = false) {
  const perms = []
  roles.forEach((role) => {
    Object.keys(scanner).forEach((mode) => {
      if (
        scanner[mode]?.enabled &&
        scanner[mode][provider] &&
        (scanner[mode][provider].includes(role) ||
          !scanner[mode][provider].length ||
          (trialActive && scanner[mode]?.trialPeriodEligible))
      ) {
        perms.push(mode)
      }
    })
  })
  return [...new Set(perms)]
}

module.exports = scannerPerms
