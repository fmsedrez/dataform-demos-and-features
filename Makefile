help:
	@echo "---------------- HELP ---------------------"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/\://'| sed -e 's/##//'

.DEFAULT_GOAL := help

ifneq ("$(wildcard .env)","")
	include .env
endif
##Attention: each env has it on GCP project (dev|prd)

tf-init-%: ## Use $make tf-init-(dev|prd)
	terraform -chdir=infra init -reconfigure \
		-backend-config="bucket=${PROJECT_ID_PREFIX}-$*-tf-state" \
		-backend-config="prefix=${BUCKET_PREFIX}"

tf-plan-%: ## Use $make tf-plan-(dev|prd)
	terraform -chdir=infra plan -var="gcp_project_id=${PROJECT_ID_PREFIX}-$*" -var-file=$*.tfvars -out plan_$*.tfplan

tf-apply-%: ## Use $make tf-apply-(dev|prd)
	terraform -chdir=infra apply "plan_$*.tfplan"

tf-clean: ## Remove temp terraform files
	# CAUNTION: don't delete .terraform-version file
	rm -rf .terraform .terraform.lock.hcl *.tfplan tmp

df-init-creds: ## Create local credential to connect in warehouse
	# CAUNTION: don't commit .df-credentials.json
	dataform init-creds bigquery
