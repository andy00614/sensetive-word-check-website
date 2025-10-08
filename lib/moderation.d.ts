import type { BlockTerm } from "./data/manual-overrides"

export type ModerationLevel = "safe" | "warning" | "danger"

export type ModerationMatch =
  | { term: string; category: "manual-allow"; severity: "safe"; matchType: "allow" }
  | { term: string; category: BlockTerm["category"]; severity: BlockTerm["severity"]; matchType: "block" }

export interface ModerationResult {
  success: true
  level: ModerationLevel
  score: number
  confidence: number
  matches: ModerationMatch[]
  meta: {
    timestamp: string
    processingTime: number
    version: string
  }
}

export function evaluateContent(content: string): ModerationResult
