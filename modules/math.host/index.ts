import express from "express";
import fetch from "node-fetch";

// In-memory module registry
const modules: Record<string, { url: string; tools: string[]; transport: string }> = {};

const app = express();
app.use(express.json());

// 🔧 Register a module
app.post("/register", (req, res) => {
  const { name, url, tools } = req.body;

  if (!name || !url || !Array.isArray(tools)) {
    return res.status(400).json({ error: "Missing name, url, or tools[] in body" });
  }

  modules[name] = { url, tools, transport: "http" };
  console.log(`✅ Registered module: ${name} at ${url} with tools: ${tools.join(", ")}`);
  res.json({ message: `Registered module: ${name}` });
});

// 🗑️ Deregister a module
app.post("/deregister", (req, res) => {
  const { name } = req.body;

  if (!name || !modules[name]) {
    return res.status(400).json({ error: `Module ${name} not found` });
  }

  delete modules[name];
  console.log(`🗑️ Deregistered module: ${name}`);
  res.json({ message: `Deregistered module: ${name}` });
});

// 📋 List all modules
app.get("/modules", (_req, res) => {
  res.json(modules);
});

// 🔁 Tool forwarding
app.post("/tool/:toolName", async (req, res) => {
  const toolName = req.params.toolName;

  // Find module that provides this tool
  const entry = Object.entries(modules).find(([_, mod]) => mod.tools.includes(toolName));

  if (!entry) {
    return res.status(404).json({ error: `No module found for tool: ${toolName}` });
  }

  const [moduleName, module] = entry;

  console.log(`🔁 Forwarding tool: ${toolName} to module: ${moduleName}`);
  console.log(`📦 Payload:`, req.body);

  try {
    const response = await fetch(`${module.url}/tool/${toolName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    console.log(`✅ Response from module:`, data);
    res.json(data);
  } catch (err: any) {
    console.error(`❌ Error forwarding to module:`, err);
    res.status(500).json({ error: err.message });
  }
});

// 🛡️ Start the host
app.listen(4000, () => {
  console.log("🚀 math.host listening at http://localhost:4000");
});
