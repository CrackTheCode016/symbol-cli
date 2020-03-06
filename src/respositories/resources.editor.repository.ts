import * as path from 'path'
import { TemplateConfig, NodeType } from '../models/template'

/**
 * Template resources editor repository.
 */
export class ResourcesEditor {


    // constants for resource configuration
    private readonly RESOURCE_NAMES: string[] = []

    private readonly API_EXTENSIONS: string[] = ['filespooling', 'partialtransaction']

    private readonly BROKER_EXTENSIONS: string[] = ['addressextraction', 'mongo', 'zeromq', 'hashcache']

    private readonly SHARED_EXTENSIONS: string[] = [
        'diagnostics', 'hashcache', 'nodediscovery', 'packetserver',
        'pluginhandlers', 'sync', 'timesync', 'transactionsink', 'unbondedpruning']

    private readonly PEER_EXTENSIONS: string[] = ['harvesting', 'syncsource']

    private readonly DUAL_EXTENSIONS: string[] = this.SHARED_EXTENSIONS
        .concat(this.API_EXTENSIONS, this.PEER_EXTENSIONS)

    private readonly PEER_P2P = 'peers-p2p.json'
    private readonly PEER_API = 'peers-api.json'

    private resourcesPath: string

    constructor(public readonly templateUrl: string) {
        this.resourcesPath = path.join(templateUrl, 'resources')
    }

    /**
     * Apply - Apply the config file to the resources.
     * @param {string} alternativeConfigUrl - Alternative configuration file
     */
    public applyConfig(alternativeConfigUrl?: string) {
        throw new Error('not implemented')
    }

    /**
     * changeBootKey
     */
    public changeBootKey(newBootKey: string) {
        throw new Error('not implemented')
    }

    /**
    * changeHarvestingKey
    */
    public changeHarvestingKey(newHarvesterKey: string) {
        throw new Error('not implemented')
    }

    /**
     * changeFriendlyName
     */
    public changeFriendlyName(newFriendlyName: string) {
        throw new Error('not implemented')
    }

    /**
     * changeMaxFee
     */
    public changeMaxFee(newMaxFee: string) {
        throw new Error('not implemented')
    }

    /**
     * Change Role - Change the node's role via its extensions.
     */
    public changeTopology(type: NodeType) {
        throw new Error('not implemented')
    }

    /**
     * addNewPeer - Adds a new peer to peers.json
     */
    public addNewPeer(ip: string, role: NodeType) {
        throw new Error('not implemented')
    }

    /**
     * changeExtentionsProperties - Changes a extension set given a list of extensions.
     */
    private changeExtentionsProperties(extensions: string[]) {
        throw new Error('not implemented')
    }

    /**
     * changeUserProperties - Changes a user properties given a template configuration.
     */
    private changeUserProperties(config: TemplateConfig) {
        throw new Error('not implemented')
    }

    /**
     * changeNodeProperties - Changes node properties given a template configuration.
     */
    private changeNodeProperties(config: TemplateConfig) {
        throw new Error('not implemented')
    }

    /**
     * changeLoggingProperties - Changes the logging configuration.
     */
    private changeLoggingProperties() {
        throw new Error('not implemented')
    }

    /**
    * buildResourceFileUrl - Build a valid resource file name.
    */
    private buildResourceFileUrl(name: string): string {
        return path.join(this.resourcesPath, `config-${name}.properties`)
    }
}
