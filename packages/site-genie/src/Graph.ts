import { PluginDriver } from './utils/PluginDriver';
import { SiteGenieConfig } from './types/common';

export default class Graph {
  readonly pluginDriver: PluginDriver;
  readonly siteGenieConfig: SiteGenieConfig;

  constructor(options: SiteGenieConfig) {
    this.siteGenieConfig = options;
    this.pluginDriver = new PluginDriver(options);
  }

  /**
   * 开始同步
   */
  async sync(): Promise<void> {
    // 执行插件的start钩子
    await this.pluginDriver.executeVoidHooks('start', [this.siteGenieConfig]);
    // 从写作平台下载文档
    let docList = await this.pluginDriver.executeFromPluginHook('down', []);
    // 执行插件的transform钩子，处理文档详情
    docList = await this.pluginDriver.executeChainHooks('transform', [docList]);
    // 执行插件的upload钩子，上传文档到目标平台
    await this.pluginDriver.executeVoidHooks('deploy', [docList]);
    // 执行插件的end钩子
    await this.pluginDriver.executeVoidHooks('end', []);
  }
}
