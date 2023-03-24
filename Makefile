-include .env
export $(shell sed 's/=.*//' .env)

.PHONY: help

## Displays available commands
help:
	@echo "$$(tput bold)Available rules:$$(tput sgr0)";echo;sed -ne"/^## /{h;s/.*//;:d" -e"H;n;s/^## //;td" -e"s/:.*//;G;s/\\n## /---/;s/\\n/ /g;p;}" ${MAKEFILE_LIST}|LC_ALL='C' sort -f|awk -F --- -v n=$$(tput cols) -v i=19 -v a="$$(tput setaf 6)" -v z="$$(tput sgr0)" '{printf"%s%*s%s ",a,-i,$$1,z;m=split($$2,w," ");l=n-i;for(j=1;j<=m;j++){l-=length(w[j])+1;if(l<= 0){l=n-i-length(w[j])-1;printf"\n%*s ",-i," ";}printf"%s ",w[j];}printf"\n";}'|more $(shell test $(shell uname) == Darwin && echo '-Xr')
## Alias for "docker-compose up"
up:
	docker-compose up
## Alias for "docker-compose down"
down:
	docker-compose down
## Application initialization
create-local:
	graph create --node http://localhost:8020/ popsicle-subgraph
remove-local:
	graph remove --node http://localhost:8020/ popsicle-subgraph
deploy-local:
	graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 popsicle-subgraph
