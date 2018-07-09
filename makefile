default:
	@echo "This is your makefile speaking"

deploy:
	@echo "Pushing to origin and production"
	@echo "git push"
	@git push
	@echo "git ftp push"
	@git ftp push
