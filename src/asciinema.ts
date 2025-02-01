import { visit, type Visitor } from "unist-util-visit";
import {
	constructAsciinemaImage,
	constructAsciinemaScript,
	getURL,
} from "./utils";

// eslint-disable-next-line
const RemarkAsciinemaEmbedOptions = ["image", "script"] as const;
type RemarkAsciinemaEmbedOption = (typeof RemarkAsciinemaEmbedOptions)[number];

interface RemarkAsciinemaOptions {
	embedType: RemarkAsciinemaEmbedOption;
}

export default function asciinema(
	options: RemarkAsciinemaOptions = { embedType: "script" },
) {
	return function transformer(tree: Parameters<typeof visit>[0]) {
		visit(
			tree,
			"text",
			(
				node: Parameters<Visitor>[0] & { value: string },
				_: number,
				parent: Parameters<Visitor>[2],
			) => {
				const { value } = node;
				const asciinemaURL =
					parent?.type === "paragraph" &&
					getURL(value, (url) => url.host.includes("asciinema.org"));
				if (!asciinemaURL) return;

				const transform =
					options.embedType === "script"
						? constructAsciinemaScript
						: constructAsciinemaImage;

				node.type = "html";
				node.value = transform(asciinemaURL.toString());
				return;
			},
		);
	};
}
