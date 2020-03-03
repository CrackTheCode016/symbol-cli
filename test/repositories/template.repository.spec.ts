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
import { TemplateRespoitory } from '../../src/respositories/template.repository'

describe('TemplateRepository', () => {
    let fileUrl: string
    let templateUrl: string

    let templateSampleDTO = {
        name: 'sample-template',
        config: {
            friendlyName: 'friendlyNode123',
            bootPrivateKey: 'bootKey',
            harvesterKey: 'harvesterKey',
            maxFee: 10,
        },
    }

    before(() => {
        templateUrl = '../sample-template'
        fileUrl = '.symbol-cli/'
    })

    it('should instantiate a new template repository', () => {
        const templateRepository = new TemplateRespoitory(fileUrl)
        expect(templateRepository).to.not.be.equal(undefined)
        expect(templateRepository['fileUrl']).to.be.equal(fileUrl)
    })

    it('should save a new template', () => {
        const templateRepository = new TemplateRespoitory(fileUrl)
        const template = templateRepository.register(templateUrl)
        expect(template.name).to.be.equal(templateSampleDTO.name)
    })

    it('should get a specific template', () => {
        const templateRepository = new TemplateRespoitory(fileUrl)
        const template = templateRepository.getByName('sample-template')
        expect(template).to.not.be.equal(undefined)
        expect(template.name).to.be.equal('sample-template')
    })

    it('should throw an error if there is a duplicate template', () => {
        const templateRepository = new TemplateRespoitory(fileUrl)
        expect(templateRepository.register(templateUrl)).to.throws('Template already exists')
    })

    it('throw an error if a template does not exist', () => {
        const templateRepository = new TemplateRespoitory(fileUrl)
        expect(templateRepository.getByName('some-template')).to.throws('Template is not registered')
    })

    it('get all templates', () => {
        const templateRepository = new TemplateRespoitory(fileUrl)
        const templates = templateRepository.getAllTemplates()
        templateRepository.register(templateUrl)
        expect(templates).to.not.be.equal(undefined)
        expect(templates.length).to.be.equal(1)
    })

    it('set and get a default selected template', () => {
        const templateRepository = new TemplateRespoitory(fileUrl)
        const template = templateRepository.register(templateUrl)
        templateRepository.setDefault('sample-template')
        const defaultTemplate = templateRepository.getDefault()

        expect(defaultTemplate.name).to.be.equal(template.name)
    })
})
