
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
}

/**
 * Template model.
 */
export class Template {
    constructor(public readonly templateName: string, public readonly config: TemplateConfig) { }

    /**
    * Gets template name.
    * @returns {string}
    */
    get name(): string {
        return this.templateName
    }

    /**
    * Gets node name.
    * @returns {string}
    */
    get friendlyName(): string {
        return this.config.friendlyName
    }

    /**
    * Gets the max fee for the node.
    * @returns {number}
    */
    get maxFee(): number {
        return this.config.maxFee
    }

    /**
    * Gets template name.
    * @returns {string}
    */
    get harvesterKey(): string {
        return this.config.harvesterKey
    }

    /**
    * Gets the node's private boot key.
    * @returns {string}
    */
    get bootPrivateKey(): string {
        return this.config.bootPrivateKey
    }

    /**
    * Creates a Template from a DTO.
    * @param {TemplateDTO} templateDTO
    * @returns {Template}
    */
    public static createFromDTO(templateDTO: TemplateDTO): Template {
        const config = new TemplateConfig(
            templateDTO.config.friendlyName,
            templateDTO.config.bootPrivateKey,
            templateDTO.config.harvesterKey,
            templateDTO.config.maxFee)
        return new Template(templateDTO.name, config)
    }
}
