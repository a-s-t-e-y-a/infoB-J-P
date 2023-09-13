# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build backend-bjp`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t backend-bjp`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system backend-bjp && \
          adduser --system -G backend-bjp backend-bjp

COPY dist/backend-bjp backend-bjp
RUN chown -R backend-bjp:backend-bjp .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix backend-bjp --omit=dev -f install

CMD [ "node", "backend-bjp" ]
