# 🧠 MCP Math — Modular AI Calculator

This is a minimal, end-to-end **MCP-compliant** project that demonstrates modular AI architecture with **dynamic registration**, **HTTP-based orchestration**, and a simple **Gradio UI frontend**.

---

## ✨ What It Does

- `math.interface`: Computes `a + b` via a module.
- `math.host`: Forwards requests to the correct tool/module using dynamic in-memory registration.
- `math.ui_client`: A lightweight Gradio UI to input numbers and see results.
- `scripts/registerModule.ts`: Registers/deregisters modules to the host dynamically — just like true MCP would.

---

## 🧱 Project Structure

```
math_mcp/
├── modules/
│   ├── math.interface/        # The MCP module that does addition
│   ├── math.host/             # The MCP host that forwards tool requests
│   └── math.ui_client/        # Gradio UI client
├── scripts/
│   └── registerModule.ts      # CLI utility to register/deregister/list modules
└── README.md
```

---

## 🚀 Quick Start

### 1. Install all dependencies

```bash
cd math_mcp
npm install
```

Then for each module:

```bash
cd modules/math.interface
npm install
npm link typescript-sdk
```

Repeat for `math.host`.

---

### 2. Run Modules

#### Terminal 1: Start `math.interface`

```bash
cd modules/math.interface
npx tsx index.ts
```

#### Terminal 2: Start `math.host`

```bash
cd modules/math.host
npx tsx index.ts
```

---

### 3. Register Module

In root `math_mcp`:

```bash
npx tsx scripts/registerModule.ts register math.interface http://localhost:3001 add_numbers
```

✅ You should see:
```
📦 Registering module to host at http://localhost:4000
✅ Host response: { message: 'Registered module: math.interface' }
```

---

### 4. Run Gradio UI Client

```bash
cd modules/math.ui_client
python3 math_ui_client.py
```

🖼️ Navigate to `http://localhost:7860`, enter numbers, and hit "Compute Sum" — enjoy your modular math!

---

## 🔧 Commands

```bash
# Register
npx tsx scripts/registerModule.ts register math.interface http://localhost:3001 add_numbers

# List
npx tsx scripts/registerModule.ts list

# Deregister
npx tsx scripts/registerModule.ts deregister math.interface
```

---

## 📦 Technologies

- TypeScript + tsx
- Node.js (v20+)
- MCP-compliant architecture
- Gradio (Python frontend)
- Express (host + module)
- `node-fetch`, `zod`, `yaml`

---

## 🧭 Architecture Diagram

> (optional: include if you'd like me to generate and attach a diagram like the one earlier!)

---

## 🏁 Status

✅ Fully working  
✅ Dynamic module registration  
✅ Modular + MCP-aligned  
🔜 Next: Add multi-tool support, persistent registry, and CLI diagnostics

---

## 📝 License
MIT — use freely and share knowledge! 🙌
