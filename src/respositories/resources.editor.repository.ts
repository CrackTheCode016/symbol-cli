import * as path from 'path'
import * as fs from 'fs-extra'
import * as _ from 'properties-reader'
import { TemplateConfig, NodeType, Template, TemplateDTO } from '../models/template'
import PropertiesReader = require('properties-reader')
import { Peer, PeerFileDTO } from '../models/peer'

/**
 * Resources property interface.
 */
interface Property {
    propertyName: string;
    value: number | string | boolean | null;
}

/**
 * Template resources editor repository.
 */
export class ResourcesEditor {

    // constants for resource configuration

    private readonly SHARED_CONFIG_FILE_NAMES: string[] = ['inflation', 'network', 'task', 'timesync', 'user']

    private readonly PEER_CONFIG_FILE_NAMES: string[] = ['harvesting']

    private readonly API_CONFIG_NAMES: string[] = ['database', 'messaging', 'pt']

    private readonly API_EXTENSIONS: Property[] = [
        { propertyName: 'filespooling', value: true },
        { propertyName: 'partialtransaction', value: true },
    ]

    private readonly BROKER_EXTENSIONS: string[] = ['addressextraction', 'mongo', 'zeromq', 'hashcache']

    private readonly SHARED_EXTENSIONS: string[] = [
        'diagnostics', 'hashcache', 'nodediscovery', 'packetserver',
        'pluginhandlers', 'sync', 'timesync', 'transactionsink', 'unbondedpruning']

    private readonly PEER_EXTENSIONS: string[] = ['harvesting', 'syncsource']

    // private readonly DUAL_EXTENSIONS: string[] = this.SHARED_EXTENSIONS
    //     .concat(this.API_EXTENSIONS, this.PEER_EXTENSIONS)

    private resourcesPath: string
    private templateConfigPath: string
    private readonly PEER_P2P = 'peers-p2p.json'
    private readonly PEER_API = 'peers-api.json'

    constructor(public readonly templateUrl: string) {
        this.resourcesPath = path.join(templateUrl, 'resources')
        this.templateConfigPath = path.join(templateUrl, 'symbol-config.json')
    }

    /**
     * Apply - Apply the config file to the resources.
     * @param {string} alternativeConfigUrl - Alternative configuration file
     */
    public applyConfig(alternativeConfigUrl?: string) {
        let template: Template
        if (alternativeConfigUrl) {
            template = Template.createFromDTO(fs.readJsonSync(alternativeConfigUrl))
        }
        template = Template.createFromDTO(fs.readJsonSync(this.templateConfigPath))

        this.changeUserProperties(template.config)
        this.changeNodeProperties(template.config)
        this.changeHarvestingProperties(template.config)

        if (template.nodeRole === NodeType.Peer) {
            this.changeExtentionsProperties(this.API_EXTENSIONS)
        } else if (template.nodeRole === NodeType.Api) {
            this.changeExtentionsProperties(this.API_EXTENSIONS)
        } else if (template.nodeRole === NodeType.Dual) {
            this.changeExtentionsProperties(this.API_EXTENSIONS)
        }
        else { throw new Error('Unknown node role type') }

    }

    /**
     * readSelectedParameter
     */
    public readSelectedParameter(propertyName: string, resourceName: string): Property {
        const fileUrl = this.buildResourceFileUrl(resourceName)
        const loadedProperties = PropertiesReader(fileUrl)
        if (loadedProperties !== null) {
            return { propertyName, value: loadedProperties.get(propertyName) }
        }
        throw new Error('Property is null or does not exist')
    }

    /**
     * changeBootKey
     */
    public changeBootKey(newBootKey: string) {
        const template: TemplateDTO = fs.readJsonSync(this.templateConfigPath)
        template.config.bootPrivateKey = newBootKey
        fs.writeJsonSync(this.templateConfigPath, template)
    }

    /**
    * changeHarvestingKey
    */
    public changeHarvestingKey(newHarvesterKey: string) {
        const template: TemplateDTO = fs.readJsonSync(this.templateConfigPath)
        template.config.harvesterKey = newHarvesterKey
        fs.writeJsonSync(this.templateConfigPath, template)
    }

    /**
     * changeFriendlyName
     */
    public changeFriendlyName(newFriendlyName: string) {
        const template: TemplateDTO = fs.readJsonSync(this.templateConfigPath)
        template.config.friendlyName = newFriendlyName
        fs.writeJsonSync(this.templateConfigPath, template)
    }

    /**
     * changeMaxFee
     */
    public changeMaxFee(newMaxFee: number) {
        const template: TemplateDTO = fs.readJsonSync(this.templateConfigPath)
        template.config.maxFee = newMaxFee
        fs.writeJsonSync(this.templateConfigPath, template)
    }

    /**
     * Change Role - Change the node's role via its extensions.
     */
    public changeTopology(type: NodeType) {
        const template: TemplateDTO = fs.readJsonSync(this.templateConfigPath)
        template.config.role = type
        fs.writeJsonSync(this.templateConfigPath, template)
    }

    /**
     * addNewPeer - Adds a new peer to peers.json
     */
    public addNewPeer(name: string, publicKey: string, ip: string, role: NodeType) {
        const peersP2PFile: PeerFileDTO = fs.readJsonSync(path.join(this.resourcesPath, this.PEER_P2P))
        const peersApiFile: PeerFileDTO = fs.readJsonSync(path.join(this.resourcesPath, this.PEER_API))
        const newPeer = new Peer(publicKey, name, ip, role).toDTOForStorage()
        peersP2PFile.knownPeers.push(newPeer)
        peersApiFile.knownPeers.push(newPeer)

        fs.writeJsonSync(path.join(this.resourcesPath, this.PEER_P2P), peersP2PFile)
        fs.writeJsonSync(path.join(this.resourcesPath, this.PEER_API), peersApiFile)
    }

    /**
     * getPeers - Loads peers from peers-p2p.json
     */
    public getPeers(): Peer[] {
        const peers: Peer[] = []
        const peersP2PFile: PeerFileDTO = fs.readJsonSync(path.join(this.resourcesPath, this.PEER_P2P))
        for (let peer of peersP2PFile.knownPeers) {
            peers.push(new Peer(peer.publicKey, peer.metadata.name, peer.endpoint.host, peer.metadata.roles))
        }
        return peers
    }

    /**
     * changeExtentionsProperties - Changes a extension set given a list of extensions.
     */
    private changeExtentionsProperties(extensions: Property[]) {
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
     * changeHarvestingProperties - Changes harvesting properties given a template configuration.
     */
    private changeHarvestingProperties(config: TemplateConfig) {
        throw new Error('not implemented')
    }


    /**
    * buildResourceFileUrl - Build a valid resource file name.
    */
    private buildResourceFileUrl(name: string): string {
        return path.join(this.resourcesPath, `config-${name}.properties`)
    }

    /**
     * changeSelectedProperty - Changes a selected property, given a properties file.
     */
    private changeSelectedProperties(file: string, properties: Property[]) {
        const fileUrl = this.buildResourceFileUrl(file)
        const loadedProperties = PropertiesReader(fileUrl)
        for (let property of properties) {
            if (property.value !== null) {
                loadedProperties.set(property.propertyName, property.value)
            }
        }
        loadedProperties.save(fileUrl)
    }
}
