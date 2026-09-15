import type { TrackDescriptor } from "@/types/musicConfig";

/**
 * 侧栏音乐本地曲目数据源。
 *
 * 这些曲目由 provider: "local" / "mixed" 使用；与内容仓 config/music.yaml 的
 * meting 歌单会自动合并（mixed 模式）。
 *
 * 路径约定（务必遵守，否则播放会 404）：
 * - source：音频文件，相对 /public 或绝对 URL —— 此处音频在 public/assets/music/url/
 * - cover：封面，相对 /src 或 /public —— 此处封面在 public/assets/images/music/
 */
export const musicTracks: readonly TrackDescriptor[] = [
	{
		id: "dazbee",
		title: "口笛で愛は歌えない",
		artist: "Dazbee",
		cover: "assets/images/music/dazbee.webp",
		source: "/assets/music/url/dazbee.mp3",
		duration: 241,
	},
	{
		id: "hitori",
		title: "ひとり上手",
		artist: "Kaya",
		cover: "assets/images/music/hitori.webp",
		source: "/assets/music/url/hitori.mp3",
		duration: 253,
	},
	{
		id: "xryx",
		title: "眩耀夜行",
		artist: "スリーズブーケ",
		cover: "assets/images/music/xryx.webp",
		source: "/assets/music/url/xryx.mp3",
		duration: 245,
	},
	{
		id: "cl",
		title: "春雷の頃",
		artist: "22/7",
		cover: "assets/images/music/cl.webp",
		source: "/assets/music/url/cl.mp3",
		duration: 242,
	},
	{
		id: "sakamichi",
		title: "坂道のメロディ",
		artist: "YUKI",
		cover: "assets/images/music/sakamichi.webp",
		source: "/assets/music/url/sakamichi.mp3",
		duration: 257,
	},
];
