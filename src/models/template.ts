
/**
 * Template configuration data transfer object.
 */
export interface TemplateConfigDTO {
    friendlyName: string;
    bootPrivateKey: string;
    harvesterKey: string;
    maxFee: number;
}

/**
 * Template data transfer object.
 */
export interface TemplateDTO {
    name: string;
    config: TemplateConfigDTO;
}

/**
 * Template config model.
 */
export class TemplateConfig {
    constructor(
        readonly friendlyName: string,
        readonly bootPrivateKey: string,
        readonly harvesterKey: string,
        readonly maxFee: number) { }

    // todo: implement get methods

    public createFromDTO(): TemplateConfig { throw new Error('not implemented') }
}

/**
 * Template model.
 */
export class Template {
    constructor(readonly templateName: string, readonly templateConfig: TemplateConfig) { }
    public createFromDTO(): Template { throw new Error('not implemented') }
}
