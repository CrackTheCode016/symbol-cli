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
import { Template, TemplateDTO } from '../models/template'
import * as fs from 'fs-extra'
import * as path from 'path'


/**
 * Template repository
 */
export class TemplateRespoitory {
    /**
     * Constructor
     * @param {string} folderDir - File path where templates are saved.
     */

    private stateFileUrl: string
    constructor(public readonly folderDir: string) {
        fs.ensureDirSync(folderDir)
        fs.ensureFileSync(path.join(folderDir, 'templates-state.json'))
        this.stateFileUrl = path.join(folderDir, 'templates-state.json')
        fs.writeJsonSync(this.stateFileUrl, {})
    }

    /**
     * setDefault
     * @param {string} name - Name of template to be made default
     */
    public setDefault(name: string) {
        const target = fs.readdirSync(this.folderDir).find((e) => e === name)
        if (target === undefined) {
            throw new Error('Template with name ' + name + ' does not exist')
        }
        const templateDTO: TemplateDTO = JSON.parse(target)
        templateDTO.defaultTemplate = true
        this.saveState(templateDTO)
    }

    /**
     * Get selected, default template
     */
    public getDefault(): Template {
        const state: TemplateDTO = fs.readJsonSync(this.stateFileUrl)
        return Template.createFromDTO(state)
    }

    /**
     * Register template
     * @param {string} targetPath - Path where the template to be registered is located.
     */
    public register(targetPath: string): Template {
        const files = fs.readdirSync(targetPath)
        const templateNames = fs.readdirSync(this.folderDir)
        if (files.length === 4 &&
            files.includes('data') &&
            files.includes('seed') &&
            files.includes('resources') &&
            files.includes('symbol-config.json')) {
            const configFile = path.join(targetPath, 'symbol-config.json')
            const template = Template.createFromDTO(fs.readJsonSync(configFile))
            if (templateNames.includes(template.name)) {
                throw new Error('Template with same name already registered!')
            }
            const dest = path.join(this.folderDir, template.name)
            fs.ensureDirSync(dest)
            fs.copySync(targetPath, dest)
            return template
        }
        throw new Error('Not a valid template')
    }

    /**
     * Saves template state
     */
    public saveState(template: TemplateDTO) {
        fs.writeFileSync(this.stateFileUrl, JSON.stringify(template))
    }

    /**
     * Get a template by name
     * @param {string} name - Name of template to be fetched
     */
    public getByName(name: string): Template {
        const target = fs.readdirSync(this.folderDir).find((e) => {
            console.log(e)
            return e === name
        })
        console.log(target)
        if (target === undefined) {
            throw new Error('Template with name ' + name + ' does not exist')
        }
        const configFile = path.join(this.folderDir, target, 'symbol-config.json')
        console.log(configFile)
        return Template.createFromDTO(fs.readJsonSync(configFile))
    }

    /**
     * Get all registered templates
     */
    public getAllTemplates(): Template[] {
        let templates: Template[] = []
        try {
            const files = fs.readdirSync(this.folderDir)
            files.forEach((file) => {
                if (file !== 'templates-state.json') {
                    const configFile = path.join(this.folderDir, file, 'symbol-config.json')
                    templates.push(Template.createFromDTO(fs.readJsonSync(configFile)))
                }
            })
        }
        catch (e) {
            throw new Error('Error occured while fetching templates: ' + e)
        }
        return templates
    }
}
