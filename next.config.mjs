import { withContentlayer } from "next-contentlayer";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default withContentlayer({
  images: {
    domains: ["vjdhwnhtmmpuhqgpozhy.supabase.co", "bit.ly"],
  },
  async rewrites() {
    return [
      {
        source: "/stats",
        destination:
          "https://sbmicrohub-analytics-gcmjnqk9w-julianacosta.vercel.app",
      },
    ];
  },
});
