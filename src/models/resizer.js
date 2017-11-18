import Backbone from 'backbone'

let ResizerModel = Backbone.Model.extend({
    defaults: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        mode: 'all'
    }
});

export default ResizerModel;