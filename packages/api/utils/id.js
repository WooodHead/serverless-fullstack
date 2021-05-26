import { customAlphabet } from 'nanoid'

export const ID_SIZE = 10

// Remove similar-looking characters: I L O l o
const alphabet = '0123456789_ABCDEFGHJKMNPQRSTUVWXYZ-abcdefghijkmnpqrstuvwxyz'

// 1% probability of collission in ~193 years generating 1 ID a minute https://zelark.github.io/nano-id-cc/
const nanoid = customAlphabet(alphabet, ID_SIZE)

export function generateId() {
  return nanoid()
}
