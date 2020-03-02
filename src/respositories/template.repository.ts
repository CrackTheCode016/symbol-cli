import { Template } from '../models/template'


/**
 * Template repository
 */
export class TemplateRespoitory {
    /**
     * Constructor
     * @param {string} fileUrl - File path where templates are saved.
     */
    constructor(private readonly fileUrl: string) {
        throw new Error('not implemented')
    }

    /**
     * registerTemplate
     */
    public registerTemplate(): boolean {
        throw new Error('not implemented')
    }

    /**
     * getTemplateByName
     */
    public getTemplateByName(): Template {
        throw new Error('not implemented')
    }
}
