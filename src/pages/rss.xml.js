import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE, TECH_BLOG_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return rss({
		title: `${SITE_TITLE} — ${TECH_BLOG_TITLE}`,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
