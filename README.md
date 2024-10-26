# policyholder-inquiry-system

The referral relationships of policyholders are presented in the structure of a binary tree.

## Getting Start

First, run the development server:

```shell
yarn stall
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

| Variable            | Example                     | Description  |
| ------------------- | --------------------------- | ------------ |
| NEXT_PUBLIC_API_URL | `http://localhost:3001/api` | API endpoint |

## Dependencies

- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js.
- [Next.js](https://nextjs.org/) - The React framework for the web.
- [TanStack Query](https://www.npmjs.com/package/@tanstack/react-query) - Hooks for fetching, caching and updating asynchronous data in React.

## Dev Tools

- [clsx](https://www.npmjs.com/package/clsx) - A tiny utility for constructing className strings conditionally.
- [concurrently](https://www.npmjs.com/package/concurrently) - Run multiple commands concurrently.
- [@mockoon/cli](https://www.npmjs.com/package/@mockoon/cli) - A lightweight and fast NPM package to deploy mock APIs by feed it with a Mockoon's data file, or OpenAPI specification file (JSON or YAML).

## Demo

- Feature1: Search policyholders via input or tree node button
  ![search](https://github.com/user-attachments/assets/dc2195ca-5f7a-4e94-9145-888c156454c2)

- Feature2: Search top policyholders via top button
  ![top](https://github.com/user-attachments/assets/56abc3f8-7d8c-4fb1-b0a2-21073d5959c2)
