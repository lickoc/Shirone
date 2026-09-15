/**
 * 用户配置覆盖层（由 `pnpm content:sync` 生成，请勿手工编辑）。
 *
 * 内容来自内容仓的以下文件，改配置请改那边：
 * - config/site.yaml
 * - config/profile.yaml
 * - config/announcement.yaml
 * - config/sidebar.yaml
 * - config/footer.yaml
 * - config/music.yaml
 * - config/anime.yaml
 * - config/nav-bar.yaml
 *
 * 每个领域的类型标注让 `tsc` 直接校验用户配置：拼错的键、越界的枚举、填错的类型
 * 都会在这里报错，错误信息里的行号可以对回上面的 YAML 文件。
 */

import type { AnimeConfig } from "@/types/animeConfig";
import type { AnnouncementConfig } from "@/types/announcementConfig";
import type { ProfileConfig, SiteConfig } from "@/types/config";
import type { FooterConfig } from "@/types/footerConfig";
import type { MusicConfig } from "@/types/musicConfig";
import type { NavBarConfigOverride } from "@/types/navBarConfig";
import type { SidebarConfig } from "@/types/sidebarConfig";

/**
 * 用户只需要写想改的键，因此每个领域都按「深度可选」校验。
 *
 * 数组保持原类型不放宽：清单类配置（侧栏 widget、社交链接）的覆盖语义是整体替换，
 * 半个元素没有意义，而且保留完整类型才能让判别联合的 `type` 字段继续生效。
 */
type DeepPartial<T> = T extends readonly unknown[]
	? T
	: T extends object
		? { [K in keyof T]?: DeepPartial<T[K]> }
		: T;

// config/site.yaml
const site: DeepPartial<SiteConfig> = {
	site: "https://lickoc.site/",
	base: "/",
	title: "随风录",
	subtitle: "LC's Blog",
	topAppBar: {
		contentAlign: "center",
	},
	lang: "zh_CN",
	timeZone: "Asia/Shanghai",
	themeColor: {
		hue: 240,
		fixed: false,
		style: "tonalSpot",
		spec: "2025",
	},
	wallpaperMode: {
		defaultMode: "banner",
	},
	texture: {
		enable: true,
		defaultPreset: "none",
	},
	banner: {
		src: {
			desktop: [
				"assets/images/banner/desktop/1.webp",
				"assets/images/banner/desktop/2.webp",
				"assets/images/banner/desktop/3.webp",
				"assets/images/banner/desktop/4.webp",
			],
			mobile: [
				"assets/images/banner/mobile/1.webp",
				"assets/images/banner/mobile/2.webp",
				"assets/images/banner/mobile/3.webp",
				"assets/images/banner/mobile/4.webp",
			],
		},
		position: "center",
		dim: {
			enable: true,
			opacity: 0.24,
		},
		homeText: {
			enable: true,
			title: "随风录",
			subtitle: [
				"风过留痕，我录我心",
				"What I cannot create, I do not understand",
			],
			typewriter: {
				enable: true,
				speed: 100,
				deleteSpeed: 50,
				pauseTime: 2000,
				loop: true,
			},
		},
		carousel: {
			enable: true,
			interval: 6000,
			fadeDuration: 1200,
			animation: "ken-burns",
		},
		waves: {
			enable: true,
		},
	},
	toc: {
		enable: true,
		depth: 2,
	},
	progressIndicator: {
		style: "dual",
	},
	favicon: [
		{
			src: "/logo/icon.webp",
		},
	],
};

// config/profile.yaml
const profile: DeepPartial<ProfileConfig> = {
	avatar: "assets/images/avatar.webp",
	name: "Lickoc",
	bio: "What I cannot create, I do not understand",
	links: [
		{
			name: "GitHub",
			url: "https://github.com/lickoc",
			icon: "fa6-brands:github",
		},
		{
			name: "QQ",
			url: "https://qm.qq.com/q/1048796996",
			icon: "fa6-brands:qq",
		},
		{
			name: "Email",
			url: "mailto:lctlz1239@yeah.net",
			icon: "material-symbols:mail",
		},
		{
			name: "Bilibili",
			url: "https://space.bilibili.com/290824740",
			icon: "fa6-brands:bilibili",
		},
	],
};

// config/announcement.yaml
const announcement: DeepPartial<AnnouncementConfig> = {
	content: "欢迎来到我的博客",
	closable: true,
	link: {
		enable: true,
		text: "了解更多",
		url: "/about/",
		external: false,
	},
};

// config/sidebar.yaml
const sidebar: DeepPartial<SidebarConfig> = {
	enable: true,
	arrangement: "dual",
	side: "left",
	components: [
		{
			type: "profile",
			enable: true,
			slot: "top",
		},
		{
			type: "music",
			enable: true,
			slot: "top",
		},
		{
			type: "announcement",
			enable: true,
			slot: "top",
			pages: [
				"home",
			],
		},
		{
			type: "categories",
			enable: true,
			slot: "sticky",
			collapseAfter: 5,
		},
		{
			type: "tags",
			enable: true,
			slot: "sticky",
			collapseAfter: 20,
		},
		{
			type: "stats",
			enable: true,
			slot: "top",
			column: "secondary",
		},
		{
			type: "calendar",
			enable: true,
			slot: "top",
			column: "secondary",
		},
		{
			type: "toc",
			enable: true,
			slot: "sticky",
			column: "secondary",
			pages: [
				"post",
			],
		},
	],
};

// config/footer.yaml
const footer: DeepPartial<FooterConfig> = {
	enable: true,
};

// config/music.yaml
const music: DeepPartial<MusicConfig> = {
	enable: true,
	provider: "mixed",
	meting: {
		server: "netease",
		type: "playlist",
		id: "14164869977",
		preload: "none",
	},
	defaultVolume: 0.7,
	defaultMode: "sequence",
};

// config/anime.yaml
const anime: DeepPartial<AnimeConfig> = {
	enable: true,
	source: {
		kind: "snapshot",
		provider: "bilibili",
	},
	fallback: {
		kind: "local",
	},
	providers: {
		bilibili: {
			enable: true,
			vmid: "290824740",
			sessdataEnv: "BILI_SESSDATA",
			cover: {
				mode: "remote",
				useWebp: true,
			},
			request: {
				pageSize: 30,
				maxItems: 300,
				minDelayMs: 300,
			},
		},
	},
};

// config/nav-bar.yaml
const navBar: NavBarConfigOverride = {
	links: [
		{
			preset: "Home",
		},
		{
			preset: "Archive",
		},
		{
			name: "Links",
			icon: "material-symbols:link",
			children: [
				{
					name: "GitHub",
					url: "https://github.com/lickoc",
					icon: "fa6-brands:github",
				},
				{
					name: "Bilibili",
					url: "https://space.bilibili.com/290824740",
					icon: "fa6-brands:bilibili",
				},
			],
		},
		{
			name: "My",
			icon: "material-symbols:person",
			children: [
				{
					preset: "Anime",
				},
				{
					preset: "Albums",
				},
				{
					preset: "Devices",
				},
			],
		},
		{
			name: "About",
			icon: "material-symbols:info",
			children: [
				{
					preset: "About",
				},
				{
					preset: "Friends",
				},
			],
		},
		{
			name: "Others",
			icon: "material-symbols:more-horiz",
			children: [
				{
					preset: "Projects",
				},
				{
					preset: "Skills",
				},
				{
					preset: "Timeline",
				},
				{
					preset: "Categories",
				},
				{
					preset: "Tags",
				},
			],
		},
	],
};

/** 领域名 -> 该领域的用户覆盖值（仅包含用户显式声明的键）。 */
export const userConfigOverrides: Readonly<Record<string, unknown>> = {
	site,
	profile,
	announcement,
	sidebar,
	footer,
	music,
	anime,
	navBar,
};

/** 本次生成消费了内容仓中的哪些文件，用于溯源与错误提示。 */
export const userConfigSources: readonly string[] = [
	"config/site.yaml",
	"config/profile.yaml",
	"config/announcement.yaml",
	"config/sidebar.yaml",
	"config/footer.yaml",
	"config/music.yaml",
	"config/anime.yaml",
	"config/nav-bar.yaml",
];
