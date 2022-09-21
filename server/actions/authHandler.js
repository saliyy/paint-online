function authHanlder(wsClient, wsData) {
    if (wsData.user && wsData.user.id) {
        wsClient.id = wsData.user.id;
    }
}

module.exports = authHanlder
