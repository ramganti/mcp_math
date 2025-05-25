import fetch from "node-fetch";

const args = process.argv.slice(2);
const [command, name, url, ...tools] = args;

const HOST = "http://localhost:4000";

if (command === "register") {
  if (!name || !url || tools.length === 0) {
    console.error("❌ Usage: registerModule.ts register <name> <url> <tool1> [tool2 ...]");
    process.exit(1);
  }

  const payload = {
    name,
    url,
    tools
  };

  console.log(`📦 Registering module to host at ${HOST}`);
  console.log(JSON.stringify(payload, null, 2));

  const res = await fetch(`${HOST}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await res.json();
  console.log("✅ Host response:", result);

} else if (command === "deregister") {
  if (!name) {
    console.error("❌ Usage: registerModule.ts deregister <name>");
    process.exit(1);
  }

  const res = await fetch(`${HOST}/deregister`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  const result = await res.json();
  console.log("✅ Host response:", result);

} else if (command === "list") {
  const res = await fetch(`${HOST}/modules`);
  const result = await res.json();

  console.log("📋 Registered modules:");
  console.log(JSON.stringify(result, null, 2));
} else {
  console.error("❌ Usage: registerModule.ts <register|deregister|list>");
  process.exit(1);
}
