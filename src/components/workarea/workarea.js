import Backbone from 'backbone'
import Picture from '../picture/picture'
import Video from '../video/video'
import PictureModel from '../../models/picture';
import VideoModel from '../../models/video';
import getVideoId from '../../helpers/getVideoId'

let Workarea = Backbone.View.extend({
    tagName: 'div',
    className: 'workarea',
    initialize() {
        Backbone.on('addPicture', this._addPicture, this);
        Backbone.on('addVideo', this._addVideo, this);
        Backbone.on('moveObject', this._saveState, this);
    },
    _saveState() {
        this.model.set('height', $(this.$el).prop('scrollHeight'));
        $(this.$el).css('height', this.model.get('height'));
    },
    _addPicture(src) {
        let picture = new PictureModel();

        picture.set('src', src);
        this.$el.append(new Picture({model: picture}).el)
    },
    _addVideo(url) {
        let video = new VideoModel();
        let src = 'https://img.youtube.com/vi/' + getVideoId(url) + '/0.jpg';

        video.set({
            url: url,
            src: src,
        });
        this.$el.append(new Video({model: video}).el)
    }
});

export default Workarea;