import Backbone from 'backbone'

let ResizerView = Backbone.View.extend({
    tagName: 'div',
    className: 'resizer',
    state: {
        direction: null,
        top: null,
        left: null
    },
    template: {
        angle: '<div class="resizer__item" data-direction="lt"></div>' +
        '<div class="resizer__item" data-direction="rt"></div>' +
        '<div class="resizer__item" data-direction="lb"></div>' +
        '<div class="resizer__item" data-direction="rb"></div>',
        side:
        '<div class="resizer__item" data-direction="t"></div>' +
        '<div class="resizer__item" data-direction="l"></div>' +
        '<div class="resizer__item" data-direction="r"></div>' +
        '<div class="resizer__item" data-direction="b"></div>'
    },
    render() {
        let template;

        if (this.model.get('mode') === 'angle') {
            template = this.template.angle;
        } else if (this.model.get('mode') === 'side') {
            template = this.template.side;
        } else {
            template = this.template.angle + this.template.side;
        }
        this.$el.html(template);
        return this;
    },
    events: {
        'dragstart': () => {
            return false
        },
        'mousedown .resizer__item': '_resizeStart',
    },
    _resizeStart(event) {
        event.stopPropagation();

        this.state.direction = $(event.currentTarget).data('direction');
        this.state.left = event.clientX;
        this.state.top = event.clientY;

        $(document).on('mousemove', (event) => {
            this._resize(event);
        });
    },
    _resize(event) {
        event.stopPropagation();

        let resize = $(this.$el.parent()),
            resizeX = resize.position().left,
            resizeY = resize.position().top,
            resizeW = resize.width(),
            resizeH = resize.height(),
            directionX = event.clientX - this.state.left,
            directionY = event.clientY - this.state.top;

        if (this.state.direction.indexOf('t') > -1) {
            resizeH -= directionY;
            if (resizeH > 0) {
                resizeY += directionY;
            }
        }

        if (this.state.direction.indexOf('b') > -1) {
            resizeH += directionY;
        }

        if (this.state.direction.indexOf('l') > -1) {
            resizeW -= directionX;
            if (resizeW > 0 ) {
                resizeX += directionX;
            }
        }

        if (this.state.direction.indexOf('r') > -1) {
            resizeW += directionX;
        }

        this.model.set({
            top: resizeY,
            left: resizeX,
            width: resizeW,
            height: resizeH
        });

        this.state.left = event.clientX;
        this.state.top = event.clientY;

        $(document).on('mouseup', this._resizeStop);
    },
    _resizeStop() {
        $(document).off('mouseup');
        $(document).off('mousemove');
    },
    initialize() {
        this.render()
    },
});

export default ResizerView;