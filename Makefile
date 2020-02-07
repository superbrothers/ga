NODE_VERSION ?= 12
NODE_IMAGE := node:$(NODE_VERSION)
DOCKER_RUN := docker run --rm -v "$${PWD}:/app" -w /app -it $(NODE_IMAGE)
NPM ?= $(DOCKER_RUN) npm
VERSION := $(shell cat package.json | jq -r '.version')
IMAGE := docker.io/superbrothers/ga:$(VERSION)

.PHONY: image
image:
		DOCKER_BUILDKIT=1 docker build --build-arg NODE_VERSION=$(NODE_VERSION) -t $(IMAGE) .

.PHONY: push-image
push-image:
		doker push $(IMAGE)

.PHONY: dist
dist:
		zip ga.zip README.md LICENSE bin/ga
		shasum -a 256 ga.zip  | awk '{print $$1}' > ga.zip.sha256

.PHONY: update
update:
		@./hack/update-readme.sh
		@./hack/update-bin.sh

.PHONY: verify
verify:
		@./hack/verify-readme.sh
		@./hack/verify-bin.sh

.PHONY: clean
clean:
		$(RM) ga.zip ga.zip.sha256

.PHONY: run-in-node
run-in-node:
		$(DOCKER_RUN) /bin/bash
