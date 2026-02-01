# FormCmsAdminApp

FormCmsAdminApp is the admin portal for [FormCMS](https://github.com/formcms/formcms). It provides a user-friendly interface for managing content, schemas, and settings within the FormCMS ecosystem.

## Architecture

For a detailed overview of the system architecture, please refer to the [FormCMS Architecture Wiki](https://github.com/formcms/formcms/wiki/Architecture.md).

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/formcms/FormCmsAdminApp.git
    cd FormCmsAdminApp
    ```

2.  **Initialize Submodules:**

    The core logic of the application resides in the `libs` submodule. You must initialize it before proceeding.

    ```bash
    git submodule update --init --recursive
    ```

    > **Note:** The `libs/FormCmsAdminSdk` submodule contains the main business logic and reusable components.

3.  **Install Dependencies:**

    ```bash
    pnpm install
    ```

## Features

-   **Customizable Branding:** The app allows users to change the logo and other branding elements to match their organization's identity.
-   **Schema Management:** Create and modify content schemas visually.
-   **Content Management:** efficient tools for creating and editing content.

## Build and Publish

Scripts for building and publishing are defined in `package.json`.

### Build

To build the application for production:

```bash
npm run build
```

This will compile the TypeScript code and bundle the application using Vite.

### Publish to Library

To publish the package to the library:

```bash
npm run publish-to-lib
```
