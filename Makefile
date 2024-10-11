.PHONY: openapi
openapi:
	openapi-generator-cli generate -i ./docs/openapi.yaml -g typescript-fetch -o ./generated