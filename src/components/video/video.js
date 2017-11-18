import Picture from '../picture/picture'
import Resizer from '../resizer/resizer'
import ResizerModel from '../../models/resizer'

let Video = Picture.extend({
    className: 'object object_video',
    initResizer () {
        return new Resizer({
            model: new ResizerModel({mode: 'side'})
        });
    },
});

export default Video;