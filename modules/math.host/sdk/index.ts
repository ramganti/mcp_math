export function createModule(config: any) {
  return config;
}

export function createHost(config: any) {
  console.log("🚀 Host started:", config.name);
  console.log("🔗 Registered modules:");
  for (const mod in config.modules) {
    console.log(`  • ${mod}`);
  }
  return config;
}
