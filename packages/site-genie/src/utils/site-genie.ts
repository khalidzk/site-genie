import { SiteGenieConfig } from '../types/common';

/**
 * Type helper to make it easier to use siteGenie.config.ts
 * accepts a direct {@link SiteGenieConfig} object that returns it.
 */
export function defineConfig(config: SiteGenieConfig | SiteGenieConfig[]) {
  return config;
}
