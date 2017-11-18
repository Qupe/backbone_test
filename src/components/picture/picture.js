import Backbone from 'backbone'
import ResizerView from '../resizer/resizer'
import ResizerModel from '../../models/resizer'

let Picture = Backbone.View.extend({
    tagName: 'div',
    className: 'object object_picture',
    events: {
        'dragstart': () => {
            return false
        },
        'mousedown': '_moveStart',
        'mouseup': '_moveEnd'
    },
    render() {
        this.$el.css({
            'background-image': 'url(' + this.model.get('src') + ')',
            'width': this.model.get('width') + 'px',
            'height': this.model.get('height') + 'px',
            'top': this.model.get('top') + 'px',
            'left': this.model.get('left') + 'px',
        });

        this.$el.append(this.resizer.el);
        return this;
    },
    initResizer() {
        return new ResizerView({
            model: new ResizerModel({mode: 'angle'})
        });
    },
    initialize() {
        this.resizer = this.initResizer();

        this.listenTo(this.resizer.model, 'change', (event) => {
            this.model.set({
                width: event.get('width'),
                height: event.get('height'),
                top: event.get('top'),
                left: event.get('left'),
            });
            this.render();
        });

        this.model.set({
            top: ($(document).height() - this.model.get('height')) / 2,
            left: ($(document).width() - this.model.get('width')) / 2
        });

        this.render();
    },
    _moveStart(event) {
        let position = $(this.$el).position();

        this.left = event.pageX - position.left;
        this.top = event.pageY - position.top;

        $(document).on('mousemove', (event) => {
            this._move(event);
        });
    },
    _move(event) {
        this.model.set({
            left: event.pageX - this.left,
            top: event.pageY - this.top
        });

        $(this.$el).css({
            'left': this.model.get('left') + 'px',
            'top': this.model.get('top') + 'px'
        });
    },
    _moveEnd() {
        Backbone.trigger('moveObject');

        $(document).off('mouseup');
        $(document).off('mousemove');
    }
});

export default Picture;