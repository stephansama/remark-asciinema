import { visit, type Visitor } from "unist-util-visit";
import {
	constructAsciinemaImage,
	constructAsciinemaScript,
	getURL,
} from "./utils";

export type RemarkAsciinemaEmbedOption = "image" | "script";

export interface RemarkAsciinemaOptions {
	embedType: RemarkAsciinemaEmbedOption;
}

export default function asciinema(
	options: RemarkAsciinemaOptions = { embedType: "script" },
) {
	const transform =
		options.embedType === "script"
			? constructAsciinemaScript
			: constructAsciinemaImage;

	return function transformer(tree: Parameters<typeof visit>[0]) {
		visit(
			tree,
			"text",
			(node: Parameters<Visitor>[0] & { value: string }) => {
				const { value } = node;
				const asciinemaURL = getURL(value, (url) =>
					url.host.includes("asciinema.org"),
				);

				if (!asciinemaURL) return;

				node.type = "html";
				node.value = transform(asciinemaURL.toString());
			},
		);
	};
}
