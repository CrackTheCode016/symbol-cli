import { TemplateRespoitory } from '../respositories/template.repository'
import { Template } from '../models/template'

/**
 * Template service
 */
export class TemplateService {
    constructor(private readonly templateRepository: TemplateRespoitory) { }

    /**
    * Add a new template from an existing template
    * @param {string} pathToTemplate - Path to existing template to be registered
    */
    public addNewTemplate(pathToTemplate: string): Template {
        return this.templateRepository.register(pathToTemplate)
    }

    /**
    * Add a new template from an existing template
    */
    public getAllRegisteredTemplates(): Template[] {
        return this.templateRepository.getAllTemplates()
    }

    /**
    * Gets the default template.
    */
    public getDefault(): Template {
        return this.templateRepository.getDefault()
    }

    /**
    * Sets the default template.
    * @param {string} templateName - The name of the template
    */
    public setDefault(templateName: string) {
        this.templateRepository.setDefault(templateName)
    }
}
