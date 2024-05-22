import { IPlugin } from './plugin';

export type InputOptions = SiteGenieConfig | SiteGenieConfig[];
export interface NormalizeSiteGenieOption {
  plugins: IPlugin[];
}
/**
 * siteGenie.config.ts 配置文件
 */
export interface SiteGenieConfig {
  /**是否禁用该同步流程 */
  disable?: boolean;
  /** 写作平台 */
  from: IPlugin;
  /** 博客平台 */
  to: IPlugin | IPlugin[];
  /** 处理插件 */
  plugins?: IPlugin[];
}
