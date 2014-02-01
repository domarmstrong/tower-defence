function Canvas(id) {
    this.c = document.getElementById(id);
    this.cx = this.c.getContext('2d');
    this.events = {};
}
Canvas.prototype = {
    draw: function draw() {

    },
    clear: function clear() {
        this.cx.clearRect(0, 0, this.c.width, this.c.height);
    },
    on: function (name, fn) {
        // TODO: make this work for namespaces and multiple fns array
        this.off(name, fn);
        this.c.addEventListener(name, fn);
        this.events[name] = fn;
    },
    off: function (name, fn) {
        // TODO: make this work for namespaces and multiple fns array
        if (typeof name == 'string' && !fn) {
            fn = this.events.name; 
        } else if (typeof name == 'function') {
            fn = name;
            name = null;
            for (var n in this.events) {
                if (this.events.hasOwnProperty(n)) {
                    if (fn == this.events[n]) {
                        name = n;
                    }
                }
            }
            if (!name) {
                throw new Error('Cannot find event handler');
            }
        }
        this.c.removeEventListener(name, fn);
    }
};
module.exports = Canvas;
