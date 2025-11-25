			import rss from '@astrojs/rss';
			import { getCollection } from 'astro:content';
			import type { CollectionEntry } from 'astro:content';
			import type { AstroGlobal } from 'astro';

type Post = CollectionEntry<'post'>;

export async function GET(context: AstroGlobal) {
				const posts = await getCollection('post');
				return rss({
					title: 'Blog',
					description: 'A blog about stuff',
					site: context.site ?? 'https://default-site-url.com',
					items: posts.map((post: Post) => ({
						title: post.data.title,
						pubDate: post.data.publishDate,
						description: post.data.description,
						link: `/post/${post.id}/`,
					})),
				});
			}