FROM public.ecr.aws/docker/library/node:22.6 as base

USER root
RUN npm install -g pnpm vite

FROM base as build

USER root
WORKDIR /home/node
COPY . .
RUN pnpm install --prefer-frozen-lockfile
RUN pnpm build

FROM base as runner

USER node
WORKDIR /home/node
COPY --chown=node:root . .
COPY --from=build --chown=node:root /home/node/dist /home/node/dist
COPY --from=build --chown=node:root /home/node/node_modules /home/node/node_modules

ENTRYPOINT ["vite", "preview", "--host"]