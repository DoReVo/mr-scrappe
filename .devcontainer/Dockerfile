# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.166.1/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 14, 12, 10
ARG VARIANT="14-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

RUN apt-key adv --refresh-keys --keyserver keyserver.ubuntu.com

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#   && apt-get -y install --no-install-recommends ca-certificates \
#   fonts-liberation \ 
#   libappindicator3-1 \ 
#   libasound2 \ 
#   libatk-bridge2.0-0 \ 
#   libatk1.0-0 \ 
#   libc6 \ 
#   libcairo2 \ 
#   libcups2 \ 
#   libdbus-1-3 \ 
#   libexpat1 \ 
#   libfontconfig1 \ 
#   libgbm1 \ 
#   libgcc1 \ 
#   libglib2.0-0 \ 
#   libgtk-3-0 \ 
#   libnspr4 \ 
#   libnss3 \ 
#   libpango-1.0-0 \ 
#   libpangocairo-1.0-0 \ 
#   libstdc++6 \ 
#   libx11-6 \ 
#   libx11-xcb1 \ 
#   libxcb1 \ 
#   libxcomposite1 \ 
#   libxcursor1 \ 
#   libxdamage1 \ 
#   libxext6 \ 
#   libxfixes3 \ 
#   libxi6 \ 
#   libxrandr2 \ 
#   libxrender1 \ 
#   libxss1 \ 
#   libxtst6 \ 
#   lsb-release \ 
#   wget \ 
#   xdg-utils

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
# RUN su node -c "npm install -g <your-package-list -here>"


RUN usermod -l dorevo node