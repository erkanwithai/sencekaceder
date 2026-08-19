# Deployment

## Current status

The GitHub Pages and custom-domain integration is operational.

- **Public URL:** <https://sencekaceder.com>
- **Repository:** `erkanwithai/sencekaceder`
- **Pages source:** GitHub Actions
- **Custom domain:** `sencekaceder.com`
- **Domain ownership:** verified in GitHub
- **HTTPS:** enforced; the GitHub Pages certificate covers the apex and `www` hostnames
- **Current artifact:** the exploratory quiz prototype, deployed temporarily for product review
- **Validation:** the deployed prototype has been completed successfully from a mobile phone

This proves the hosting path, DNS, TLS, static asset delivery, runtime JSON loading, and mobile access. It does not complete the planned production build or daily publishing system.

## Cloudflare DNS

Cloudflare is the authoritative DNS provider. The GitHub Pages records are configured as DNS-only records; Cloudflare proxying is intentionally disabled to keep the hosting path simple.

### Apex records

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

### `www` record

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `www` | `erkanwithai.github.io` |

GitHub's account-level domain verification also uses a TXT record named `_github-pages-challenge-erkanwithai`. Its generated value belongs in Cloudflare and must not be replaced with a hard-coded value from documentation.

## Temporary prototype deployment

[`.github/workflows/deploy-prototype.yml`](../.github/workflows/deploy-prototype.yml) currently publishes `examples/quiz-prototype` as the site root.

The workflow:

1. Runs after a push to `main` changes the prototype or the workflow itself, and also supports manual dispatch.
2. Copies the prototype to a clean `dist` directory.
3. Removes the prototype README and adds `.nojekyll`.
4. Uploads a GitHub Pages artifact.
5. Deploys through the official GitHub Pages Actions.

The workflow has only the permissions required to read repository contents, write Pages deployments, and obtain an OIDC identity token. Its `pages` concurrency group prevents overlapping deployments.

Documentation-only changes do not redeploy the site.

## Production transition

The temporary workflow must be replaced rather than expanded into the production pipeline. The production deployment still needs to:

- Select an explicit dated quiz.
- Validate the date, schema, 10-question count, and referenced local assets.
- Generate a clean static artifact containing only the selected quiz.
- Run daily near 17:59 UTC / 20:59 Turkey time.
- Support a manually selected date for recovery.
- Leave the previous Pages deployment live when validation or build steps fail.

The production workflow should retain the existing GitHub Pages environment, custom-domain setting, DNS records, and HTTPS configuration.

## Operational checks

Check the latest deployment:

```sh
gh run list --workflow deploy-prototype.yml --limit 5
gh api repos/erkanwithai/sencekaceder/pages
```

Check public DNS:

```sh
dig +short A sencekaceder.com
dig +short AAAA sencekaceder.com
dig +short CNAME www.sencekaceder.com
```

Check the public response:

```sh
curl -I https://sencekaceder.com
```

DNS resolvers can temporarily retain a negative response after records are first created. If Cloudflare's authoritative nameservers and public resolvers return the expected records, allow local resolver caches to expire before changing the configuration.
