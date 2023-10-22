ARG HUGO_VER=0.118.2

FROM mcr.microsoft.com/devcontainers/javascript-node

RUN wget -O /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VER}/hugo_extended_${HUGO_VER}_linux-amd64.deb \
    && sudo dpkg -i /tmp/hugo.deb

EXPOSE 1313
