import { Command } from 'clime'
import { TemplateService } from '../services/template.service'
import { TemplateRespoitory } from '../respositories/template.repository';

export abstract class TemplateCommand extends Command {
    private readonly templateService: TemplateService

    constructor(fileUrl?: string) {
        super()
        const templateRepository = new TemplateRespoitory(fileUrl || '.symbolnode')
        this.templateService = new TemplateService(templateRepository)
    }

    protected getDefault(): Template

}
