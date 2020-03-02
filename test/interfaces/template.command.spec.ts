import { expect } from 'chai'
import { TemplateCommand } from '../../src/interfaces/template.command';

describe('Template Command', () => {

    let repositoryFileUrl: string

    class StubCommand extends TemplateCommand {
        constructor() {
            super(repositoryFileUrl)
        }

        execute(...args: any[]) {
            throw new Error('Method not implemented.')
        }
    }

    it('should register a new template', () => {

    })

    it('should print all registered templates', () => {

    })

    it('should get all saved templates', () => {

    })

    it('should change a parameter in a template', () => {

    })

    it('should change the node role in a template', () => {

    })

    it('should set a default template', () => {

    })

    it('should reset a template to nemesis', () => {

    })

    it('should throw an error if no default template exists', () => {

    })
})
