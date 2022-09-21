const {v4: uuidv4} = require("uuid");

function actionHandler(message) {
    switch (message.method) {
        case 'UserConnectedAction':
            message.message = {
                id: uuidv4(),
                text: `User ${message.user.name} has connected`,
                showInCanvasActionBar: false,
                showInActivityWindow: true,
                createdAt: new Date().toLocaleTimeString(),
            };

            return message;
        case 'BrushDrawAction':
            message.message = {
                id: uuidv4(),
                text: `User ${message.user.name} is drawing by brush`,
                showInCanvasActionBar: true,
                showInActivityWindow: false,
                createdAt: new Date().toLocaleTimeString(),
            };
            return message;
        case 'RectDrawAction':
            message.message = {
                id: uuidv4(),
                text: `User ${message.user.name} is drawing by rect`,
                showInCanvasActionBar: true,
                showInActivityWindow: false,
                createdAt: new Date().toLocaleTimeString(),
            };
            return message;
        case 'RedoAndoAction':
            message.message = {
                id: uuidv4(),
                text: `User ${message.user.name} do ${message.payload.type}`,
                showInCanvasActionBar: true,
                showInActivityWindow: false,
                createdAt: new Date().toLocaleTimeString(),
            };
            return message;
        case 'ChatMessageAction':
            message.message = {
                id: uuidv4(),
                text: `${message.user.name}: ${message.payload.textMessage}`,
                showInCanvasActionBar: false,
                showInActivityWindow: true,
                createdAt: new Date().toLocaleTimeString(),
            };
            return message;
    }
}

module.exports = actionHandler
