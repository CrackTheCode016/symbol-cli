import { Command } from 'clime'
import { TemplateService } from '../services/template.service'
import { TemplateRespoitory } from '../respositories/template.repository'
import { Template } from '../models/template'

export abstract class TemplateCommand extends Command {
    private readonly templateService: TemplateService

    constructor(fileUrl?: string) {
        super()
        const templateRepository = new TemplateRespoitory(fileUrl || '.symbol-cli')
        this.templateService = new TemplateService(templateRepository)
    }

    protected getDefault(): Template { throw new Error('not implemented') }

}
