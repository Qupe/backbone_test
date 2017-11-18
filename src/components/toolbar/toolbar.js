import Backbone from 'backbone'

let Toolbar = Backbone.View.extend({
    tagName: 'div',
    className: 'toolbar',
    initialize() {
        this.render()
    },
    events: {
        "change .toolbar__button-input": "_addPicture",
        "click .toolbar__button_video": "_addVideo",
    },
    _addPicture (event) {
        let reader = new FileReader();
        if (event.target.files.length) {
            reader.readAsDataURL(event.target.files[0]);
            reader.onloadend = () => {
                Backbone.trigger('addPicture', reader.result);
            };
        }
    },
    _addVideo (event) {
        let dialog = prompt("Ссылка на видео", "https://www.youtube.com/watch?v=o0PpZGAnBjA");
        if (dialog) {
            Backbone.trigger('addVideo', dialog);
        }
    },
    render() {
        this.$el.html(this.template);
        return this;
    },
    template: '<label class="toolbar__button toolbar__button_picture">' +
    '<input type="file" class="toolbar__button-input" value="" accept="image/*"/>Добавить фото' +
    '</label><button class="toolbar__button toolbar__button_video">Добавить видео</button>'
});

export default Toolbar;