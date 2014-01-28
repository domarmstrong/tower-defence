function Game() {
    this.canvas = new Canvas();
    this.mouse = new Mouse();
    this.setupMouse();
    this.home();
}
Game.prototype = {
    newGame: function newGame() {
        this.home();
    },
    setupMouse: function setupMouse() {
        this.canvas.canvas.addEventListener('click', this.mouse.click.bind(this.mouse), false);
        this.canvas.canvas.addEventListener('mousemove', this.mouse.move.bind(this.mouse), false);
    },
    home: function home() {
        var self = this;
        this.screen = new Screen([
            new Button({
                x: 20, y: 20, w: 100, h: 50,
                text: 'A button',
                click: function () {
                    self.other();
                }
            })
        ])
        this.mouse.registerScreen(this.screen);
        this.screen.draw(this.canvas);
    },
    other: function other() {
        var self = this;
        this.screen = new Screen([
            new Button({
                x: 20, y: 90, w: 100, h: 50,
                text: 'Other',
                click: function () {
                    self.home();
                }
            })
        ])
        this.mouse.registerScreen(this.screen);
        this.screen.draw(this.canvas);
    }
};

function Screen(controls) {
    this.controls = controls;
}
Screen.prototype = {
    draw: function draw(canvas) {
        canvas.clear();
        for (var i = 0; i < this.controls.length; i++) {
            this.controls[i].draw(canvas.context);
        }
    }
};

function Mouse() {
    this.screen;
}
Mouse.prototype = {
    registerScreen: function registerScreen(screen) {
        this.screen = screen;
    },
    move: function move(event) {
    },
    click: function click(event) {
        if (!this.screen) return;
        for (var i = 0; i < this.screen.controls.length; i++) {
            var it = this.screen.controls[i];
            if (!it.click) continue;
            it.click(event);
        }
    }
};

function Canvas() {
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
}
Canvas.prototype = {
    draw: function draw() {

    },
    clear: function clear() {
        this.canvas.width = this.canvas.width;
    }
};

function Button(props) {
    this.props = props;
}
Button.prototype = {
    draw: function draw(c) {
        var p = this.props;
        c.fillStyle = '#222555';
        c.fillRect(p.x, p.y, p.w, p.h);
        this.text(c);
    },
    text: function text(c) {
        var p = this.props;
        if (! p.text) return;
        c.font = 'bold 18px sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillStyle = '#FFFFFF';
        c.fillText(p.text, p.x + p.w / 2, p.y + p.h / 2)
    },
    click: function click(event) {
        var p = this.props,
            x = event.offsetX,
            y = event.offsetY;
        if (
            (x > p.x && x < p.x + p.w) &&
            (y > p.y && y < p.y + p.h)
        ) {
            if (this.props.click) {
                this.props.click();
            }
        }
    }
};
