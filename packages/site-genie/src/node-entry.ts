import { SiteGenieConfig, InputOptions } from './types/common';
import Graph from './Graph';
import out from './utils/logger';

export default siteGenie;

/**
 * 入口命令
 * @param rawInputOptions
 */
export function siteGenie(rawInputOptions: InputOptions): void {
  return siteGenieInternal(rawInputOptions);
}

/**
 * 内部执行
 * @param rawInputOptions
 */
export function siteGenieInternal(rawInputOptions: InputOptions): void {
  // 处理输入参数
  const flowList = getInputOptions(rawInputOptions);
  if (!flowList.length) {
    out.error('没有可执行的工作流');
  }
  for (let i = 0; i < flowList.length; i++) {
    const options = flowList[i];
    const graph = new Graph(options);
    try {
      // 初始化流程
      // 开始同步
      void graph.sync();
    } catch (error_: any) {
      throw error_;
    }
  }
}

/**
 * 处理 SiteGenie 配置，将所有配置其转化为插件
 * @param config
 */
function normalizeSiteGenieOptions(config: InputOptions): SiteGenieConfig[] {
  let siteGenieConfigs: SiteGenieConfig[] = [];
  // 判断是否是数组
  if (Array.isArray(config)) {
    // 递归处理
    siteGenieConfigs = config;
  } else {
    siteGenieConfigs = [config];
  }

  return siteGenieConfigs.filter((config) => {
    // 过滤不需要同步的流程
    return !config.disable;
  });
}

/**
 * 获取输入参数
 * @param initialInputOptions
 */
function getInputOptions(initialInputOptions: InputOptions) {
  if (!initialInputOptions) {
    throw new Error('You must supply an options to siteGenie');
  }
  return normalizeSiteGenieOptions(initialInputOptions);
}
