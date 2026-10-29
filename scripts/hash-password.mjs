// Creates the admin password check for config.js (PBKDF2-SHA256, 600,000 rounds).
// Usage: node scripts/hash-password.mjs
// It asks for the new password (nothing is shown while typing), then prints the
// "admin" block to paste into assets/js/config.js. The password itself is never saved.
import { pbkdf2Sync, randomBytes } from "node:crypto";
import { createInterface } from "node:readline";

function ask(question) {
  return new Promise(resolve => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = s => { if (s.includes(question)) process.stdout.write(s); };
    rl.question(question, answer => { rl.close(); process.stdout.write("\n"); resolve(answer); });
  });
}

const password = process.env.STS_ADMIN_PASSWORD || await ask("New admin password: ");
if (password.length < 12) {
  console.error("Please use at least 12 characters (a short sentence is easy to remember and hard to guess).");
  process.exit(1);
}
const salt = randomBytes(16).toString("hex");
const hash = pbkdf2Sync(password, salt, 600000, 32, "sha256").toString("hex");
console.log(`\nPaste this into assets/js/config.js, replacing the old "admin" block:\n
  admin: {
    salt: "${salt}",
    hash: "${hash}"
  },\n`);
