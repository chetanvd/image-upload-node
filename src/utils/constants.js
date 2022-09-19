const STATUS_CODES = Object.freeze({
    ok: 200,
    created: 201,
    no_content: 204,
    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    not_found: 404,
    conflict: 409,
    internal_server_error: 500,
});

const REQUEST_SCHEMA = {
    type: 'object',
    properties: {
        app_alias_name: { type: 'string' },
        userUniqueId: { type: 'string' },
        auth_details: { type: 'object' },
        targetName: { type: 'string' },
    },
    required: ['app_alias_name', 'userUniqueId', 'auth_details'],
};

const DB_COLLECTIONS = Object.freeze({
    IMAGES: 'images',
});

module.exports = {
    STATUS_CODES,
    REQUEST_SCHEMA,
    DB_COLLECTIONS,
};
