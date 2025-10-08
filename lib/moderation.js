import { SAFE_TERMS, BLOCK_TERMS } from "./data/manual-overrides.js"

const VERSION = "manual-override-v1"
const CJK_REGEX = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uff66-\uff9f]/u

const severityScore = {
  warning: 2,
  danger: 3
}

const severityConfidence = {
  warning: 0.9,
  danger: 0.98
}

function canonicalize(text) {
  return text
    .normalize("NFKC")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function matchesTerm(term, canonicalInput) {
  const canonicalTerm = canonicalize(term)
  if (!canonicalTerm) {
    return false
  }

  if (CJK_REGEX.test(term)) {
    return canonicalInput.includes(canonicalTerm)
  }

  if (/[/\s-]/.test(canonicalTerm)) {
    return canonicalInput.includes(canonicalTerm)
  }

  const regex = new RegExp(`\\b${escapeRegExp(canonicalTerm)}\\b`, "i")
  return regex.test(canonicalInput)
}

export function evaluateContent(content) {
  const start = Date.now()
  const canonicalInput = canonicalize(String(content || ""))

  const blockMatches = BLOCK_TERMS.filter((entry) => matchesTerm(entry.term, canonicalInput)).map((entry) => ({
    term: entry.term,
    category: entry.category,
    severity: entry.severity,
    matchType: "block"
  }))

  let level = "safe"
  let score = 0
  let confidence = 0.6
  const matches = []

  if (blockMatches.length > 0) {
    matches.push(...blockMatches)
    const highestSeverity = blockMatches.some((match) => match.severity === "danger") ? "danger" : "warning"
    level = highestSeverity === "danger" ? "danger" : "warning"
    score = severityScore[highestSeverity]
    confidence = severityConfidence[highestSeverity]
  } else {
    const allowMatches = SAFE_TERMS.filter((term) => matchesTerm(term, canonicalInput))
    if (allowMatches.length > 0) {
      matches.push(
        ...allowMatches.map((term) => ({
          term,
          category: "manual-allow",
          severity: "safe",
          matchType: "allow"
        }))
      )
      level = "safe"
      score = 0
      confidence = 0.95
    } else if (!canonicalInput) {
      level = "safe"
      score = 0
      confidence = 0.5
    } else {
      score = 0.1
      confidence = 0.6
    }
  }

  return {
    success: true,
    level,
    score: Number(score.toFixed(1)),
    confidence: Number(confidence.toFixed(2)),
    matches,
    meta: {
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - start,
      version: VERSION
    }
  }
}
