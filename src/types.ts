export interface SiteConfig {
	title: string;
	description: string;
	author: string;
	siteUrl: string;
	themeColor: string;
	backgroundColor: string;
	logoImage: string;
	showRobots: boolean;
	themeMode?: 'light' | 'dark' | 'user';
	date: {
		locale: string;
		options: {
			day: string;
			month: string;
			year: string;
		};
	};
	lang: string;
	ogLocale: string;
	sortPostsByUpdatedDate: boolean;
}

export interface PaginationLink {
	srLabel?: string;
	text?: string;
	url: string;
}

export interface SiteMeta {
	articleDate?: string | undefined;
	description?: string;
	ogImage?: string | undefined;
	title?: string;
}


export interface Author {
	name: string;
	photo: string;
	type: string;
	url: string;
}

export interface Content {
	"content-type": string;
	html: string;
	text: string;
	value: string;
}

export interface Rels {
	canonical: string;
}

export interface Summary {
	"content-type": string;
	value: string;
}




export interface PwaSettings {
  showRobots: boolean;
  description: string;
  name: string;
  shortName: string;
  themeColor: string;
  backgroundColor: string;
  startUrl: string;
  display: "standalone" | "fullscreen" | "minimal-ui" | "browser";
  icon192: string;
  icon512: string;
  siteUrl?: string;
  screenshot?: string;
}

export type StyleSettings = {
  lightBg: string;
  lightLink: string;
  lightText: string;
  lightAccent: string;
  lightAccent2: string;
  lightHeader: string;
  darkBg: string;
  darkLink: string;
  darkText: string;
  darkAccent: string;
  darkAccent2: string;
  darkHeader: string;
  borderRadius: string;
};