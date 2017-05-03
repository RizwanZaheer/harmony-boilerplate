import PostsLocale from '../../../../containers/posts/i18n/Posts.i18n.fr';
import UserLocale from '../../user/containers/i18n/User.i18n.fr';

const frLocale = {
    // Gulp Inject Locales Here
	...PostsLocale,
    ...UserLocale
};

export default frLocale;