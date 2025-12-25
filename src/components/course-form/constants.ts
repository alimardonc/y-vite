export const CONTENT_TYPES = {
  MARKDOWN: "markdown",
} as const;

export type ContentType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];

export const DEFAULT_VALUES_BY_TYPE = {
  [CONTENT_TYPES.MARKDOWN]: "",
};
