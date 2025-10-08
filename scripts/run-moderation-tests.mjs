import { evaluateContent } from "../lib/moderation.js"
import { SAFE_TERMS, BLOCK_TERMS } from "../lib/data/manual-overrides.js"

function formatRow(label, expected, actual, score, confidence, passed) {
  const status = passed ? "✅" : "❌"
  return `${status} ${label} | expected: ${expected.padEnd(7)} | actual: ${actual.padEnd(7)} | score: ${score.toFixed(1)} | confidence: ${(confidence * 100).toFixed(1)}%`
}

function runTests() {
  const safeCases = Array.from(new Set(SAFE_TERMS))
  const sensitiveCases = BLOCK_TERMS.map((entry) => entry.term)

  console.log("\nChecking cases that should be SAFE:\n")
  let failures = 0

  for (const term of safeCases) {
    const result = evaluateContent(term)
    const passed = result.level === "safe"
    if (!passed) failures += 1
    console.log(formatRow(term, "safe", result.level, result.score, result.confidence, passed))
  }

  console.log("\nChecking cases that should be SENSITIVE:\n")

  for (const term of sensitiveCases) {
    const result = evaluateContent(term)
    const passed = result.level !== "safe"
    if (!passed) failures += 1
    console.log(formatRow(term, "danger", result.level, result.score, result.confidence, passed))
  }

  if (failures > 0) {
    console.error(`\nTests completed with ${failures} failing case(s).`)
    process.exitCode = 1
  } else {
    console.log("\nAll manual moderation cases passed! 🎉")
  }
}

runTests()
