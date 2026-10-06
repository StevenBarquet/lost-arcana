// @ts-check
import { installPostCommit } from "./install-git-hooks.mjs";

async function main() {
  await installPostCommit();
  console.log(`
  '+-----------+'
  '| H O O K S |'
  '+-----------+'
  `);
}

main();
