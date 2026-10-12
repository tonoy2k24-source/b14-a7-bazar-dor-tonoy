import dns from "dns";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (process.env.NODE_ENV === "development") {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  } catch {}
}

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://b14-a7-bazar-dor-tonoy:B925RjtkAikwZkAO@cluster0.9gx8wse.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);
const db = client.db("bazardor");

const getBaseUrl = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};


export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "tRXhCEK46PgXQqc4dVW7qsxBg3f7VxHG",
  baseURL: getBaseUrl(),
  trustedOrigins: [
    "http://localhost:3000",
    "https://bazardor-ten.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId:
        process.env.GOOGLE_CLIENT_ID ||
        "640942645896-t6pq01toj0995tsv123vji0f751edpch.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        "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",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "Ov23liG4kzhsuzQJRzPg",
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET ||
        "691e741badba375aa79e29a9dabeecf0f28c796c",
    },
  },
});

export type Session = typeof auth.$Infer.Session;