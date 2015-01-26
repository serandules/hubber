var procevent = require('procevent');

var parent = procevent(process);
parent.on('hi', function () {
    parent.emit('hui', 'family', 6);
});
