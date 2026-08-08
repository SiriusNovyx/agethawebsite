# Deploying the Agetha.exe website on Wasmer Edge

This is a static HTML website. It uses only HTML, CSS, and a small optional vanilla JavaScript file. It has no PHP, database, Node.js project, build step, analytics, cookies, API keys, or remote JavaScript.

Wasmer serves the files in `public/` with the `wasmer/static-web-server` package configured by `wasmer.toml` and `settings/config.toml`.

## Project layout

```text
website/
├── README_DEPLOY.md
├── app.yaml.example
├── wasmer.toml
├── settings/
│   └── config.toml
└── public/
    ├── index.html
    ├── 404.html
    ├── robots.txt
    └── assets/
        ├── css/
        │   └── style.css
        └── js/
            └── main.js
```

## Before the first deployment

1. Install the current Wasmer CLI from the official Wasmer installation guide.
2. Copy `app.yaml.example` to `app.yaml`.
3. In `app.yaml`, replace:
   - `YOUR_WASMER_USERNAME` with your Wasmer account or namespace.
   - `YOUR_APP_NAME` with the app name you want to use. Use lowercase letters, numbers, and hyphens.
4. Keep `package: .` so Wasmer uses the package defined by the local `wasmer.toml`.

Do not put a password, access token, API key, or provider credential in any website file.

## Recommended CLI method

Open a terminal in the repository and run:

```bash
cd website
wasmer login
wasmer run .
```

`wasmer run .` starts the static server locally. Its default address is normally:

```text
http://localhost:8080
```

Check the home page, menu links, GitHub buttons, mobile layout, and a nonexistent path. Stop the local server with `Ctrl+C` when finished.

When you are ready to publish, run this from the same `website` directory:

```bash
wasmer deploy
```

Deployment must run from the directory containing `wasmer.toml`, the copied `app.yaml`, `settings/config.toml`, and `public/`. The deploy command packages the static files and publishes an updated Wasmer Edge app. Review its prompts before confirming.

## Official template initialization alternative

Wasmer can initialize its current static-site template with:

```bash
wasmer deploy --template=static-website
```

That command may continue into an interactive deployment flow, so run it only when you intend to configure or publish an app.

If you initialize the template in a separate empty directory:

1. Retain the Wasmer-generated configuration files.
2. Replace the template's generated `public/` content with this project's `public/` files.
3. Confirm the manifest still maps the local `public` directory to `/public`.
4. Keep the generated owner and app values rather than copying placeholders over them.
5. Test with `wasmer run .` before deploying.

## Wasmer dashboard and Git integration

Wasmer Edge supports deployment from a connected GitHub repository.

1. Connect the SiriusNovyx repository to a Wasmer Edge app.
2. Select the production branch you want Wasmer to follow.
3. Choose an HTML/static-site configuration when the interface requests a project type.
4. Ensure the project root is `website/`, or otherwise ensure Wasmer reads `website/wasmer.toml` and serves `website/public/`.
5. Do not select PHP and do not provision a database.
6. Confirm that `/` serves `public/index.html` before enabling automatic production updates.

Dashboard wording can change; use the current Wasmer interface and its configuration preview as the authority. If a real `app.yaml` is committed, Wasmer uses it to extend the connected app's configuration during Git deployment.

## Publishing future updates

After editing files under `public/`, test locally and run:

```bash
cd website
wasmer deploy
```

The application download buttons do not require a website update when a new GitHub release is published. They always point to:

```text
https://github.com/SiriusNovyx/Agetha.exe/releases/latest
```

## Post-deployment checks

1. Open the Wasmer-provided HTTPS URL.
2. Hard-refresh with `Ctrl+F5`.
3. Verify **Download Latest Release** opens the SiriusNovyx release page.
4. Verify **View Source Code** opens the SiriusNovyx repository.
5. Test menu navigation and the window controls.
6. Check a phone-sized viewport or mobile device.
7. Visit a nonexistent path and confirm the custom 404 page appears.
8. Confirm no placeholder owner or app name appears on the public page.
9. If anything is wrong, correct the local files and deploy again; Wasmer also retains app versions for controlled rollback.

Nothing in this guide requires PHP, Apache, a database, npm, or a build command.
