# starting from node 14
FROM node:lts
RUN echo "\n\e[33mFrom node 14\e[0m"

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive

# update system
RUN echo "\n\e[33mUpdating packages\e[0m"
RUN apt -y update \
    && apt -y install --no-install-recommends apt-utils lsb-release dialog 2>&1

# install php and extensions
RUN echo "\n\e[33mInstalling PHP with extensions\e[0m"
RUN apt -y install php
RUN apt -y install php-iconv
RUN apt -y install php-mbstring
RUN apt -y install php-curl
RUN apt -y install php-tokenizer
RUN apt -y install php-xmlrpc
RUN apt -y install php-soap
RUN apt -y install php-ctype
RUN apt -y install php-zip
RUN apt -y install php-gd
RUN apt -y install php-simplexml
RUN apt -y install php-dom
RUN apt -y install php-xml
RUN apt -y install php-intl
RUN apt -y install php-json
RUN apt -y install php-mysql

# installing mysql
RUN echo "\n\e[33mInstalling MySql\e[0m"
RUN apt -y install gnupg
RUN cd /tmp
RUN wget https://dev.mysql.com/get/mysql-apt-config_0.8.13-1_all.deb
RUN dpkg -i mysql-apt-config*
RUN apt -y update
RUN apt -y install mysql-server

# installing git
RUN echo "\n\e[33mInstalling GIT\e[0m"
RUN apt -y install git-all

# installing global npm packages
RUN npm i -g typescript
RUN npm i -g jest
RUN npm i -g eslint

# installing packages dependencies
# 

# installing internal packages globally
# RUN cd /workspaces/coffeekraken && node packages/tools/sugar/src/cli/sugar.cli.js npm.bin i -p @coffeekraken/sugar -g
