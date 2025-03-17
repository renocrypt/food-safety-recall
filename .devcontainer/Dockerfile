FROM mcr.microsoft.com/devcontainers/javascript-node:0-20

# First install as root
USER root
RUN curl -fsSL https://bun.sh/install | bash
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

# Create the vscode user if it doesn't exist
RUN groupadd --gid 1000 vscode \
    && useradd --uid 1000 --gid 1000 -m vscode \
    && apt-get update \
    && apt-get install -y sudo \
    && echo vscode ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/vscode \
    && chmod 0440 /etc/sudoers.d/vscode

# Now switch to vscode user for its installation
USER vscode
RUN curl -fsSL https://bun.sh/install | bash
ENV BUN_INSTALL="/home/vscode/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

# Set working directory
WORKDIR /workspaces
