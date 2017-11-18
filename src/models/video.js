import Picture from './picture'

let Video = Picture.extend({
    defaults: _.extend({
        url: ''
    }, Picture.prototype.defaults)
});

export default Video;