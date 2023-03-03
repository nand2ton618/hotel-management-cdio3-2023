const sheepNames = ['Capn Frisky', 'Mr. Snugs', 'Lambchop'] as const
type SheepName = typeof sheepNames[number] // "Capn Frisky" | "Mr. Snugs" | "Lambchop"

// This string will be read at runtime: the TS compiler can't know if it's a SheepName.
const unsafeJson = '"Capn Frisky"'

/**
 * Return a valid SheepName from a JSON-encoded string or throw.
 */
function parseSheepName(jsonString: string): SheepName {
  const maybeSheepName: unknown = JSON.parse(jsonString)
  // This if statement verifies that `maybeSheepName` is in `sheepNames` so
  // we can feel good about using a type assertion below.
  if (
    typeof maybeSheepName === 'string' &&
    sheepNames.includes(maybeSheepName)
  ) {
    return maybeSheepName as SheepName // type assertion satisfies compiler
  }
  throw new Error('That is not a sheep name.')
}

const definitelySheepName = parseSheepName(unsafeJson)
