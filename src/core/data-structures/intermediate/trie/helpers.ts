export interface TrieNode {
  children: Record<string, TrieNode>;
  isEnd: boolean;
}

export function createNode(): TrieNode {
  return { children: {}, isEnd: false };
}

export function insertWord(root: TrieNode, word: string): void {
  let node = root;
  for (const ch of word) {
    if (!node.children[ch]) node.children[ch] = createNode();
    node = node.children[ch];
  }
  node.isEnd = true;
}

export function buildTrie(words: string[]): TrieNode {
  const root = createNode();
  words.forEach((w) => insertWord(root, w));
  return root;
}

export function collectWords(root: TrieNode, prefix = ''): string[] {
  const out: string[] = [];
  const walk = (node: TrieNode, acc: string): void => {
    if (node.isEnd) out.push(acc);
    Object.keys(node.children)
      .sort()
      .forEach((ch) => walk(node.children[ch], acc + ch));
  };
  walk(root, prefix);
  return out;
}
