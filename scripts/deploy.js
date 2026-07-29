const ghpages = require('gh-pages');

ghpages.publish(
  '.',
  {
    branch: 'gh-pages',
    dotfiles: false,
    src: [
      '**/*',
      '!node_modules/**',
      '!package.json',
      '!package-lock.json',
      '!scripts/**',
    ],
    message: 'Deploy site to GitHub Pages',
  },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('Deployed to gh-pages branch successfully.');
  },
);
