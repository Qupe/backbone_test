import Backbone from 'backbone'

let Picture = Backbone.Model.extend({
    defaults: {
        width: 300,
        height: 300,
        top: 0,
        left: 0,
        src: ''
    }
});

export default Picture;