module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix', 'git add'],
  '**/*.{md,yml,json}': ['prettier --write', 'git add'],
}
