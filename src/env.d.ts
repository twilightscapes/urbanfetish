/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-pwa/vanillajs" />

declare module "@pagefind/default-ui" {
	declare class PagefindUI {
		constructor(arg: unknown);
	}
}

// Global window extensions for YouTube timer functions
declare global {
	interface Window {
		resetYouTubeEmbedTimer?: (videoId: string) => void;
		youtubeEmbedTimers?: Map<string, { reset: () => void; stop: () => void }>;
		youtubePlayersMap?: Map<string, any>;
		pendingYouTubePlayers?: Array<{ init: () => void }>;
		onYouTubeIframeAPIReady?: () => void;
		YT?: any;
	}
	
	interface HTMLElement {
		dataset: DOMStringMap;
	}
	
	interface Element {
		dataset: DOMStringMap;
	}
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module '@/site-config' {
	export function getMenuLinks(): Promise<any[]>;
	export const siteConfig: any;
}
