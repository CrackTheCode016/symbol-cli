/**
 * Node type.
 */
export enum NodeType {
    Peer = 0,
    Dual = 1,
    Api = 2
}

/**
 * Template configuration data transfer object.
 */
export interface TemplateConfigDTO {
    friendlyName: string;
    bootPrivateKey: string;
    harvesterKey: string;
    maxFee: number;
    role: number;
}

/**
 * Template data transfer object.
 */
export interface TemplateDTO {
    name: string;
    defaultTemplate: boolean;
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
        readonly maxFee: number,
        readonly nodeType: NodeType) { }
}

/**
 * Template model.
 */
export class Template {
    constructor(public readonly templateName: string,
        private defaultTemplate: boolean,
        public readonly config: TemplateConfig) { }

    /**
    * Gets template name.
    * @returns {string}
    */
    get name(): string {
        return this.templateName
    }

    /**
    * Gets whether a template is default.
    * @returns {string}
    */
    get default(): boolean {
        return this.defaultTemplate
    }

    /**
    * Sets whether a template is default.
    * @param {boolean} isDefault - Sets whether the template is default or not
    */
    set default(isDefault: boolean) {
        this.defaultTemplate = isDefault
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
* Gets the max fee for the node.
* @returns {number}
*/
    get nodeRole(): NodeType {
        return this.config.nodeType
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
            templateDTO.config.maxFee,
            templateDTO.config.role)
        return new Template(templateDTO.name, templateDTO.defaultTemplate, config)
    }
}
