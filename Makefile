BASEDIR=$(CURDIR)
OUTPUTDIR=$(BASEDIR)/publish/html5
GITHUB_PAGES_BRANCH=gh-pages

help:
	@echo 'Makefile for a cocos game                                                 '
	@echo '                                                                          '
	@echo 'Usage:                                                                    '
	@echo '   make run                            run game                           '
	@echo '   make clean                          remove the generated files         '
	@echo '   make publish                        compile web                        '
	@echo '   make github                         upload the web site via gh-pages   '
	@echo '                                                                          '

run:
	cocos run -p web

clean:
	[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR)

publish:
	cocos compile -p web -m release --advanced

github: publish
	ghp-import -m "make github" -b $(GITHUB_PAGES_BRANCH) $(OUTPUTDIR)
	git push origin $(GITHUB_PAGES_BRANCH)
	cd $(BASEDIR); git add .; git commit -m "update web site"; git push origin master

.PHONY: help run clean publish github
