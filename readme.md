# Installation

This package is not published on npm. Install it directly from the GitHub repository:

**Using pnpm:**

```bash
pnpm add git+https://github.com/cpritch/spidev.git
```

**Using npm:**

```bash
npm install git+https://github.com/cpritch/spidev.git
```

**Using yarn:**

```bash
yarn add git+https://github.com/cpritch/spidev.git
```

## Prerequisites

Installation involves compiling a native C++ addon. Ensure you have the necessary `node-gyp` build tools installed for your system:

*   Python (v3.x recommended)
*   A C++ compiler (like GCC/Clang)
*   `make`

On Linux systems (like Raspberry Pi), you may also need the kernel headers:

```bash
# Debian/Ubuntu based systems
sudo apt-get update
sudo apt-get install -y build-essential python3 linux-headers-$(uname -r)
```

The installation process will automatically run the necessary build steps (`tsc` for TypeScript compilation and `node-gyp rebuild` for the native addon) via the `prepare` script.