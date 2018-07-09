default:
	@echo "This is your makefile speaking"

deploy:
	@echo "Pushing to origin and production"
	@git push
	@git ftp push
