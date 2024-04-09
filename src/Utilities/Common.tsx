export function findAllAnswers(word: string, wordlist: string[]): string[] {
  let res = [];
  let w1 = word.split("").sort();

  for (let word2 of wordlist) {
    let w2 = word2.toUpperCase().split("").sort();
    if (w1.indexOf(" ") === -1 && w1.join("") === w2.join("")) {
      res.push(word2.toUpperCase());
    }

    w1.forEach((c1, i) => {
      if (w2.indexOf(c1) !== -1) w2.splice(w2.indexOf(c1), 1);
    });
    if (w2.length === 2 && w1[1] === " ") res.push(word2.toUpperCase());
    if (w2.length === 1 && w1[0] === " ") res.push(word2.toUpperCase());
  }
  return res;
}
