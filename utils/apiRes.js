exports.successResponse = (res, msg) => {
    return res.status(200).json({
        message: msg
    })
};

exports.successResponseWithOnlyData = (res, value) => {
    return res.status(200).json({
        data: value
    })
};

exports.successResponseWithData = (res, msg, value) => {
    return res.status(200).json({
        message: msg,
        data: value
    })
};

exports.createdResponseWithData = (res, msg, value) => {
    return res.status(201).json({
        message: msg,
        data: value
    })
};

exports.errorResponse = (res, msg) => {
    return res.status(500).json({
        message: msg
    })
};

exports.errorResponseWithData = (res, msg, value) => {
    return res.status(500).json({
        message: msg,
        error: value
    })
};

exports.notFoundResponse = (res, msg) => {
    return res.status(400).json({
        message: msg
    })
};

exports.validationErrorResponse = (res, msg, value) => {
    return res.status(400).json({
        message: msg,
        error: value
    })
};

exports.unauthorizedResponse = (res, msg) => {
    return res.status(401).json({
        message: msg
    })
};
