export interface BlockTerm {
  term: string
  category: "hate" | "sexual" | "profanity"
  severity: "warning" | "danger"
}

export const SAFE_TERMS: readonly string[]
export const BLOCK_TERMS: readonly BlockTerm[]
