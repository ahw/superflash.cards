all:
	@echo "Run make release to release"

release:
	npm run-script build release
	cd build && aws --profile s3access s3 sync . s3://flash-cards-static-app --recursive --acl public-read --cache-control no-cache --delete --exclude ".git/*" --exclude ".DS_Store" --exclude "node_modules/*"
