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
import { Template } from '../models/template'


/**
 * Template repository
 */
export class TemplateRespoitory {
    /**
     * Constructor
     * @param {string} fileUrl - File path where templates are saved.
     */
    constructor(private readonly fileUrl: string) {
        throw new Error('not implemented')
    }

    /**
     * setDefault
     * @param {string} name - Name of template to be made default
     */
    public setDefault(name: string): Template {
        throw new Error('not implemented')
    }

    /**
     * Get selected, default template
     */
    public getDefault(): Template {
        throw new Error('not implemented')
    }

    /**
     * Register template
     * @param {string} path - Path where the template to be registered is located.
     */
    public register(path: string): Template {
        throw new Error('not implemented')
    }

    /**
     * Get a template by name
     * @param {string} name - Name of template to be fetched
     */
    public getByName(name: string): Template {
        throw new Error('not implemented')
    }

    /**
     * Get all registered templates
     */
    public getAllTemplates(): Template[] {
        throw new Error('not implemented')
    }
}
