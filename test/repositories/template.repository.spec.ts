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
import * as fs from 'fs-extra'
import { TemplateRespoitory } from '../../src/respositories/template.repository'

describe('TemplateRepository', () => {

    let folderDir: string
    let templateUrl: string

    const removeTemplatesDir = () => {
        if (fs.existsSync(process.env.HOME + '/' + folderDir)) {
            console.log('removed')
            console.log(fs.existsSync(process.env.HOME + '/' + folderDir))
            fs.removeSync(process.env.HOME + '/' + folderDir)
        }
    }

    const templateSampleDTO = {
        name: 'sample-template', defaultTemplate: false, config: {
            friendlyName: 'friendlyNode123',
            bootPrivateKey: 'bootKey',
            harvesterKey: 'harvesterKey',
            maxFee: 10,
        },
    }
    before(() => {
        removeTemplatesDir()
        templateUrl = '/Users/bader/Documents/Coding/catapult-cli/symbol-cli/test/sample-template'
        folderDir = process.env.HOME + '/.symbol-cli/'
    })

    beforeEach(() => {
        console.log('beforeEach')
        removeTemplatesDir()
    })

    after(() => {
        console.log('after')
        removeTemplatesDir()
    })

    it('should instantiate a new template repository', () => {
        const templateRepository = new TemplateRespoitory(folderDir)
        expect(templateRepository).to.not.be.equal(undefined)
        expect(templateRepository['folderDir']).to.be.equal(folderDir)
    })

    it('should save a new template', () => {
        const templateRepository = new TemplateRespoitory(folderDir)
        const template = templateRepository.register(templateUrl)
        expect(template.name).to.be.equal(templateSampleDTO.name)
    })

    it('should get a specific template', () => {
        removeTemplatesDir()
        const templateRepository = new TemplateRespoitory(folderDir)
        const template = templateRepository.getByName('sample-template')
        expect(template).to.not.be.equal(undefined)
        expect(template.name).to.be.equal('sample-template')
        removeTemplatesDir()
    })

    it('should throw an error if there is a duplicate template', () => {
        const templateRepository = new TemplateRespoitory(folderDir)
        expect(() => templateRepository.register(templateUrl)).to.throws(Error)
    })

    it('should throw an error if a template does not exist', () => {
        removeTemplatesDir()
        const templateRepository = new TemplateRespoitory(folderDir)
        expect(() => templateRepository.getByName('some-non-existent-template')).to.throws(Error)
        removeTemplatesDir()
    })

    it('get all templates', () => {
        removeTemplatesDir()
        const templateRepository = new TemplateRespoitory(folderDir)
        const templates = templateRepository.getAllTemplates()
        templateRepository.register(templateUrl)
        expect(templates).to.not.be.equal(undefined)
        expect(templates.length).to.be.equal(1)
        removeTemplatesDir()
    })

    it('set and get a default selected template', () => {
        removeTemplatesDir()
        const templateRepository = new TemplateRespoitory(folderDir)
        const template = templateRepository.register(templateUrl)
        templateRepository.setDefault('sample-template')
        const defaultTemplate = templateRepository.getDefault()

        expect(defaultTemplate.name).to.be.equal(template.name)
        removeTemplatesDir()
    })
})
