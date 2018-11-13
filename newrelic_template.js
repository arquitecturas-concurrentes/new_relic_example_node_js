'use strict'
/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
    /**
     * Array of application names.
     */
    app_name: ['My New Relic Test Application 2'],
    /**
     * Your New Relic license key.
     */
    license_key: '<your key>',
    logging: {
        /**
         * Level at which to log. 'trace' is most useful to New Relic when diagnosing
         * issues with the agent, 'info' and higher will impose the least overhead on
         * production applications.
         */
        level: 'info'
    },
    apdex_t: 0.1,
    transaction_tracer: {
        record_sql: "obfuscated"
    }
};

