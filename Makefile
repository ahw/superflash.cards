all:
	@echo "Run make build to build"

xbuild:
	npm run-script build
	cd build && aws --profile s3access s3 sync . s3://flash-cards-static-app --recursive --acl public-read --cache-control no-cache --delete --exclude ".git/*" --exclude ".DS_Store" --exclude "node_modules/*"
