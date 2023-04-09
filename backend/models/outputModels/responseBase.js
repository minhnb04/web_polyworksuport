exports.ResponseBase = function (req, res, StatusCode, Message, Data) {
    const ResponseBase = {
        "Data": Data,
        "StatusCode": StatusCode,
        "Message": Message,
        "Status": 
        StatusCode.toString() == '100' ? 'Continue':
        StatusCode.toString() == '101' ? 'Switching Protocols':
        StatusCode.toString() == '102' ? 'Processing':
        StatusCode.toString() == '200' ? 'OK':
        StatusCode.toString() == '201' ? 'Created':
        StatusCode.toString() == '202'? 'Accepted':
        StatusCode.toString() == '203'? 'Non-Authoritative Information':
        StatusCode.toString() == '204'? 'No Content':
        StatusCode.toString() == '205'? 'Reset Content':
        StatusCode.toString() == '206'? 'Partial Content':
        StatusCode.toString() == '207'? 'Multi-Status':
        StatusCode.toString() == '300'? 'Multiple Choices':
        StatusCode.toString() == '301'? 'Moved Permanently':
        StatusCode.toString() == '302'? 'Moved Temporarily':
        StatusCode.toString() == '303'? 'See Other':
        StatusCode.toString() == '304'? 'Not Modified':
        StatusCode.toString() == '305'? 'Use Proxy':
        StatusCode.toString() == '307'? 'Temporary Redirect':
        StatusCode.toString() == '400'? 'Bad Request':
        StatusCode.toString() == '401'? 'Unauthorized':
        StatusCode.toString() == '402'? 'Payment Required':
        StatusCode.toString() == '403'? 'Forbidden':
        StatusCode.toString() == '404'? 'Not Found':
        StatusCode.toString() == '405'? 'Method Not Allowed':
        StatusCode.toString() == '406'? 'Not Acceptable':
        StatusCode.toString() == '407'? 'Proxy Authentication Required':
        StatusCode.toString() == '408'? 'Request Time-out':
        StatusCode.toString() == '409'? 'Conflict':
        StatusCode.toString() == '410'? 'Gone':
        StatusCode.toString() == '411'? 'Length Required':
        StatusCode.toString() == '412'? 'Precondition Failed':
        StatusCode.toString() == '413'? 'Request Entity Too Large':
        StatusCode.toString() == '414'? 'Request-URI Too Large':
        StatusCode.toString() == '415'? 'Unsupported Media Type':
        StatusCode.toString() == '416'? 'Requested Range Not Satisfiable':
        StatusCode.toString() == '417'? 'Expectation Failed':
        StatusCode.toString() == '418'? 'I\'m a teapot':
        StatusCode.toString() == '422'? 'Unprocessable Entity':
        StatusCode.toString() == '423'? 'Locked':
        StatusCode.toString() == '424'? 'Failed Dependency':
        StatusCode.toString() == '425'? 'Unordered Collection':
        StatusCode.toString() == '426'? 'Upgrade Required':
        StatusCode.toString() == '428'? 'Precondition Required':
        StatusCode.toString() == '429'? 'Too Many Requests':
        StatusCode.toString() == '431'? 'Request Header Fields Too Large':
        StatusCode.toString() == '500'? 'Internal Server Error':
        StatusCode.toString() == '501'? 'Not Implemented':
        StatusCode.toString() == '502'? 'Bad Gateway':
        StatusCode.toString() == '503'? 'Service Unavailable':
        StatusCode.toString() == '504'? 'Gateway Time-out':
        StatusCode.toString() == '505'? 'HTTP Version Not Supported':
        StatusCode.toString() == '506'? 'Variant Also Negotiates':
        StatusCode.toString() == '507'? 'Insufficient Storage':
        StatusCode.toString() == '509'? 'Bandwidth Limit Exceeded':
        StatusCode.toString() == '510'? 'Not Extended':
        StatusCode.toString() == '511'? 'Network Authentication Required' :
        'Error'
    }
    res.send(ResponseBase);
    console.log(ResponseBase);
};