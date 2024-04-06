export function findAllAnswers(word: string, wordlist: string[]): string[] {
  let res = [];
  const w = word.split("").sort().join("").toUpperCase();
  for (let word2 of wordlist) {
    const w2 = word2.split("").sort().join("").toUpperCase();
    if (w === w2) res.push(word2.toUpperCase());
  }
  return res;
}
