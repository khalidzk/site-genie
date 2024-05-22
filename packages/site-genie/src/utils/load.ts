import path from 'path';
import JoyCon from 'joycon';
import { bundleRequire } from 'bundle-require';
import { defineConfig } from './site-genie';

export async function loadConfigFromFile(
  cwd: string,
  configFile?: string,
): Promise<{ path?: string; data?: ReturnType<typeof defineConfig> }> {
  const configJoycon = new JoyCon();
  const configPath = await configJoycon.resolve({
    files: configFile
      ? [configFile]
      : [
          'siteGenie.config.ts',
          'siteGenie.config.js',
          'siteGenie.config.cjs',
          'siteGenie.config.mjs',
        ],
    cwd,
    stopDir: path.parse(cwd).root,
    packageKey: 'siteGenie',
  });

  if (configPath) {
    const config = await bundleRequire({
      filepath: configPath,
    });
    return {
      path: configPath,
      data: config.mod.default || config.mod,
    };
  }

  return {};
}
