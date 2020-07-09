import VueI18n from 'vue-i18n';
import Vue from 'vue';
import en from './en';
import zh from './en';

const messages = {
    en: en,
    zh: zh
};

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    messages: messages
});

export default i18n;
