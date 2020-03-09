import { expect } from 'chai'
import { Template, TemplateConfig, TemplateDTO, NodeType } from '../../src/models/template'

describe('Template Model', () => {

    it('should create a template from constructor', () => {
        const config = new TemplateConfig('friendlyNode123', 'bootKey', 'harvesterKey', 0, NodeType.Api)
        const template = new Template('test-template', false, config)

        expect(template.name).to.be.equal('test-template')
        expect(template.bootPrivateKey).to.be.equal('bootKey')
        expect(template.friendlyName).to.be.equal('friendlyNode123')
        expect(template.nodeRole).to.be.equal(NodeType.Api)
        expect(template.harvesterKey).to.be.equal('harvesterKey')
        expect(template.maxFee).to.be.equal(0)
    })

    it('should create a template from DTO', () => {
        const templateDTO: TemplateDTO = {
            name: 'test-template', defaultTemplate: false, config: {
                friendlyName: 'friendlyNode123',
                role: NodeType.Dual,
                bootPrivateKey: 'bootKey',
                harvesterKey: 'harvesterKey',
                maxFee: 10,
            },
        }
        const template = Template.createFromDTO(templateDTO)

        expect(template.name).to.be.equal('test-template')
        expect(template.bootPrivateKey).to.be.equal('bootKey')
        expect(template.friendlyName).to.be.equal('friendlyNode123')
        expect(templateDTO.config.role).to.be.equal(NodeType.Dual)
        expect(template.harvesterKey).to.be.equal('harvesterKey')
        expect(template.maxFee).to.be.equal(10)

    })
})
