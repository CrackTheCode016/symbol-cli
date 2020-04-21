/*
 *
 * Copyright 2018-present NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { expect } from 'chai'
import { mock, instance, when } from 'ts-mockito'
import { TemplateRespoitory } from '../../src/respositories/template.repository'
import { TemplateService } from '../../src/services/template.service'
import { Template, NodeType } from '../../src/models/template'

describe('Template Service', () => {

    const templateSampleDTO = {
        name: 'sample-template', defaultTemplate: false, config: {
            friendlyName: 'friendlyNode123',
            role: NodeType.Dual,
            bootPrivateKey: 'bootKey',
            harvesterKey: 'harvesterKey',
            maxFee: 10,
        },
    }

    const templateSampleDTOArray = [{
        name: 'sample-template', defaultTemplate: false, config: {
            friendlyName: 'friendlyNode123',
            role: NodeType.Dual,
            bootPrivateKey: 'bootKey',
            harvesterKey: 'harvesterKey',
            maxFee: 10,
        },
    },
    {
        name: 'sample-template-2', defaultTemplate: false, config: {
            friendlyName: 'friendlyNode125',
            role: NodeType.Dual,
            bootPrivateKey: 'bootKei',
            harvesterKey: 'harvesterKei',
            maxFee: 1,
        },
    }]


    const templatesFromDTO = () => {
        let templates: Template[] = []
        templateSampleDTOArray.forEach((template) =>
            templates.push(Template.createFromDTO(template)))
        return templates
    }

    it('should create a new template service', () => {
        const mockTemplateRepository = mock(TemplateRespoitory)
        const templateService = new TemplateService(instance(mockTemplateRepository))
        expect(templateService).to.not.be.equal(undefined)
    })

    it('should register a new template', () => {
        const mockTemplateRepository = mock(TemplateRespoitory)

        const template = Template.createFromDTO(templateSampleDTO)
        when(mockTemplateRepository.register('')).thenReturn(template)

        const templateService = new TemplateService(instance(mockTemplateRepository))
        const newTemplate = templateService.addNewTemplate('')

        expect(newTemplate.name).to.be.equal(templateSampleDTO.name)
        expect(newTemplate.default).to.be.equal(templateSampleDTO.defaultTemplate)
        expect(newTemplate.bootPrivateKey).to.be.equal(templateSampleDTO.config.bootPrivateKey)
        expect(newTemplate.friendlyName).to.be.equal(templateSampleDTO.config.friendlyName)
        expect(newTemplate.harvesterKey).to.be.equal(templateSampleDTO.config.harvesterKey)
        expect(newTemplate.maxFee).to.be.equal(templateSampleDTO.config.maxFee)
    })

    it('should get current default template', () => {
        const mockTemplateRepository = mock(TemplateRespoitory)

        const template = Template.createFromDTO(templateSampleDTO)
        when(mockTemplateRepository.getDefault()).thenReturn(template)

        const templateService = new TemplateService(instance(mockTemplateRepository))
        const defaultTemplate = templateService.getDefault()

        expect(defaultTemplate.name).to.be.equal(templateSampleDTO.name)
        expect(defaultTemplate.default).to.be.equal(templateSampleDTO.defaultTemplate)
        expect(defaultTemplate.bootPrivateKey).to.be.equal(templateSampleDTO.config.bootPrivateKey)
        expect(defaultTemplate.friendlyName).to.be.equal(templateSampleDTO.config.friendlyName)
        expect(defaultTemplate.harvesterKey).to.be.equal(templateSampleDTO.config.harvesterKey)
        expect(defaultTemplate.maxFee).to.be.equal(templateSampleDTO.config.maxFee)

    })

    it('should select a new default template', () => {
        const mockTemplateRepository = mock(TemplateRespoitory)
        const template = Template.createFromDTO(templateSampleDTO)
        when(mockTemplateRepository.setDefault('sample-template'))
            .thenCall(() => template.default = true)
        when(mockTemplateRepository.getDefault())
            .thenReturn(template)
        const templateService = new TemplateService(instance(mockTemplateRepository))
        templateService.setDefault('sample-template')
        const defaultTemplate = templateService.getDefault()
        expect(defaultTemplate.default).to.be.equal(true)
    })

    it('should get all templates', () => {
        const mockTemplateRepository = mock(TemplateRespoitory)
        const template = Template.createFromDTO(templateSampleDTO)
        const templateService = new TemplateService(instance(mockTemplateRepository))

        when(mockTemplateRepository.getAllTemplates()).thenReturn(templatesFromDTO())
        const templates = templateService.getAllRegisteredTemplates()

        expect(templates.length).to.be.equal(templateSampleDTOArray.length)

    })
})
