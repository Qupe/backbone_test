import './main.scss'

import Backbone from 'backbone'
import Workarea from './components/workarea/workarea'
import Toolbar from './components/toolbar/toolbar'
import WorkareaModel from './models/workarea';

let App = Backbone.View.extend({
    render() {
        this.$el.append(this.toolbar.el);
        this.$el.append(this.workarea.el);
        return this;
    },
    initialize() {
        this.workarea = new Workarea({
            model: new WorkareaModel()
        });
        this.toolbar = new Toolbar();
        this.render()
    },
});

new App({el: $('#app')});