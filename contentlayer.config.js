import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { getLastEditedDate, urlFromFilePath } from "./src/utils";

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the article",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
  },
  computedFields: {
    url_path: {
      type: "string",
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: urlFromFilePath,
    },
    url: {
      type: "string",
      resolve: (article) => `/articles/${article._raw.flattenedPath}`,
    },
    pathSegments: {
      type: "json",
      resolve: (doc) => {
        // doc._raw.flattenedPath
        //   .split("/")
        //   // .slice(1)
        //   .map((filename, i) => {
        //     const re = /^((\d+)-)?(.*)$/;
        //     const [, , orderStr, pathName] = filename.match(re) ?? [];
        //     const order = orderStr ? parseInt(orderStr) : 0;

        //     // const title = pathName.replace("-", " ");
        //     return { [`level${i}`]: { order, pathName, title } };
        //   });
        const tocSection = doc._raw.flattenedPath.split("/")[0];
        const tocLink = doc._raw.flattenedPath.split("/")[1];

        const re = /^((\d+)-)?(.*)$/;
        const [, , orderStr, articlePathName] = tocLink.match(re) ?? [];
        const articleOrder = orderStr ? parseInt(orderStr) : 0;

        const [, , , sectionPathName] = tocSection.match(re) ?? [];

        return { sectionPathName, articlePathName, articleOrder };
      },
    },
    last_edited: { type: "date", resolve: getLastEditedDate },
  },
}));

export default makeSource({
  contentDirPath: "articles",
  documentTypes: [Article],
});
