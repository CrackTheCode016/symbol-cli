import { Command, Options, option } from 'clime'
import { TemplateService } from '../services/template.service'
import { TemplateRespoitory } from '../respositories/template.repository'
import { Template } from '../models/template'

export abstract class TemplateCommand extends Command {
    private readonly templateService: TemplateService

    constructor(fileUrl?: string) {
        super()
        const templateRepository = new TemplateRespoitory(fileUrl || process.env.HOME + '/.symbol-cli')
        this.templateService = new TemplateService(templateRepository)
    }

    protected getAllRegisteredTemplates(): Template[] {
        try {
            return this.templateService.getAllRegisteredTemplates()
        } catch (e) {
            throw Error('Templates cannot be fetched')
        }
    }

    protected getDefault(): Template {
        try {
            return this.templateService.getDefault()
        } catch (_) {
            throw Error(
                `Default template was unable to be fetched.  
                          Try setting a new default template by using symbol-cli template select <your-template-name>`)
        }
    }

    protected setDefault(options: TemplateOptions) {
        try {
            this.templateService.setDefault(options.name)
        } catch (_) {
            throw Error(`The template was unable to be selected as default. 
         Make sure the template is registered via symbol-cli template register <path-to-your-template>`)
        }
    }


    protected register(options: AddTemplateOptions) {
        console.log(options)
        try {
            this.templateService.addNewTemplate(options.targetPath)
        } catch (_) {
            console.log(_)
            throw Error(`
            There was a problem adding the template.  
            Please ensure that the path is correctly entered.`)
        }
    }
}

export class TemplateOptions extends Options {
    @option({ description: 'Template Name', flag: 'n' })
    name: string
}

export class AddTemplateOptions extends Options {
    @option({ description: 'Target template path', flag: 'p' })
    targetPath: string
}
