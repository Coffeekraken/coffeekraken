# Start from the node:latest image
FROM node:latest

# Create app directory
WORKDIR /home/web/coffeekraken

# Update apt
RUN apt-get update

# Install nano
RUN apt-get install -y nano

# Install openssh server
RUN apt-get install -y openssh-server
RUN mkdir /var/run/sshd

# Allow password login
RUN echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
RUN echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
RUN echo "PubkeyAuthentication yes" >> /etc/ssh/sshd_config
RUN echo "AuthorizedKeysFile .ssh/authorized_keys" >> /etc/ssh/sshd_config

# Change password root
RUN echo "root:coffeekrakenIO"|chpasswd

# Make the home folder /home/web/coffeekraken
RUN echo "cd /home/web/coffeekraken" >> /etc/bash.bashrc

# Restart ssh service
RUN service ssh restart

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

# Expose port 22 for ssh login
EXPOSE 22

# Launch the ssh service
CMD ["/usr/sbin/sshd", "-D"]

