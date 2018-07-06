# jeffersonlam.com

## Dev
This is a static website that uses `gulp` to compile scss.
Run `gulp` to watch for changes and compile into `dist/` folder.

## Deploy
1. Install [git-ftp](https://github.com/git-ftp/git-ftp) and set up the url, username, and password
2. Write some code and make a commit.
3. Run `git ftp push` to push the `dist/` folder. `.gitignore` has `dist/` ignored so it will not be committed to this repo, but `.git-ftp-include` has it included so it will push the compiled folder from your local repo. You cannot deploy unless you have a new commit, otherwise git ftp will assume there are no changes.
