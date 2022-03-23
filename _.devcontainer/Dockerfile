# starting from node 14
FROM node:lts
RUN echo "\n\e[33mFrom node 14\e[0m"

# Configure apt
ENV DEBIAN_FRONTEND=noninteractive

# update system
RUN echo "\n\e[33mUpdating packages\e[0m"
RUN apt-get -y update \
    && apt-get -y install --no-install-recommends apt-utils lsb-release dialog 2>&1

# System wide utils
RUN apt-get -y install sudo

# Promite the "node" user as root
# RUN usermod -aG sudo nodesudo chmod
RUN echo "\n\e[33mPromoting node user as root\e[0m"
RUN echo node ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/node
RUN chmod 0440 /etc/sudoers.d/node

# install php and extensions
# RUN echo "\n\e[33mInstalling PHP with extensions\e[0m"
# RUN apt-get -y install php
# RUN apt-get -y install php-iconv
# RUN apt-get -y install php-mbstring
# RUN apt-get -y install php-curl
# RUN apt-get -y install php-tokenizer
# RUN apt-get -y install php-xmlrpc
# RUN apt-get -y install php-soap
# RUN apt-get -y install php-ctype
# RUN apt-get -y install php-zip
# RUN apt-get -y install php-gd
# RUN apt-get -y install php-simplexml
# RUN apt-get -y install php-dom
# RUN apt-get -y install php-xml
# RUN apt-get -y install php-intl
# RUN apt-get -y install php-json
# RUN apt-get -y install php-mysql

# installing git
# RUN echo "\n\e[33mInstalling GIT\e[0m"
# RUN apt-get -y install git-all

# installing global npm packages
RUN echo "\n\e[33mInstalling typescript compiler\e[0m"
RUN npm i -g typescript
# RUN npm i -g jest
# RUN npm i -g eslint
# RUN npm i -g concurrently
# RUN npm i -g yarn

# linking local binaries to global
# RUN cd /usr/bin && ln -s /usr/local/bin/node node
# RUN cd /usr/bin && ln -s /usr/local/bin/nodejs nodejs