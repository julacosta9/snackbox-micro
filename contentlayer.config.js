import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the article",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the article",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (article) => `/articles/${article._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "articles",
  documentTypes: [Article],
});
