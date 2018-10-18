# jeffersonlam.com

## Dev
This is a static website that uses `gulp` to compile scss.
Run `gulp` to watch for changes and compile into `dist/` folder.

## Deploy
1. Install [git-ftp](https://github.com/git-ftp/git-ftp) and set up the url, username, and password
1. Write some code and make a commit.
1. Run `gulp build` to compile an optimized version of the code.
1. Run `git ftp push` to push the `build/` folder. You cannot deploy unless you have a new commit, otherwise git ftp will assume there are no changes.
