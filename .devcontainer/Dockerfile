ARG HUGO_VER=0.118.2

FROM mcr.microsoft.com/devcontainers/javascript-node

RUN wget -O /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.118.2/hugo_extended_0.118.2_linux-amd64.deb \
    && sudo dpkg -i /tmp/hugo.deb

EXPOSE 1313
