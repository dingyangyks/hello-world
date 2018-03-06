function Game(){
    this.callbacks = {};
}

Game.prototype.on = function(eventType, callback){
    if(!this.callbacks[eventType]){
        this.callbacks[eventType] = [];
    }

    this.callbacks[eventType].push(callback);
}

Game.prototype.emit = function(eventType){
    this.callbacks[eventType].forEach(function(callback) {
        callback({
            table: [123]
        })
    }, this);
}

Game.prototype.update = function(){
    this.emit('change');
}

var game = new Game();

game.on('change', function(event){
    console.log(event)
});

game.update();


