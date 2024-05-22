import { PluginContext } from '../../types/plugin';

export class SiteGenieBaseContext {
  readonly ctx: PluginContext;
  constructor(ctx: PluginContext) {
    this.ctx = ctx;
  }
}
