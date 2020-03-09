import { expect } from 'chai'
import { ResourcesEditor } from '../../src/respositories/resources.editor.repository'
import { NodeType } from '../../src/models/template'

describe('Resource Editor', () => {

    let templateUrl: string
    let alternateConfigUrl: string

    before(() => {
        templateUrl = './test/mocks/sample-template'
        alternateConfigUrl = './test/mocks/sample-template/other-config-file.json'
    })

    it('should create a new repository', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        expect(editorRepository).to.not.be.equal(undefined)
    })

    it('should change the maxfee', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        editorRepository.changeMaxFee(100)
        editorRepository.applyConfig()
        const maxFeeProperty = editorRepository.readSelectedParameter('node.minFeeMultiplier', 'node')
        expect(maxFeeProperty.propertyName).to.be.equal('node.minFeeMultiplier')
        expect(maxFeeProperty.value).to.be.equal(100)

    })

    it('should change the boot private key', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        editorRepository.changeBootKey('1000000000000000000000000000000000000000000000000000000000000001')
        editorRepository.applyConfig()
        const bootKeyProperty = editorRepository.readSelectedParameter('account.bootPrivateKey', 'user')
        expect(bootKeyProperty.propertyName).to.be.equal('account.bootPrivateKey')
        expect(bootKeyProperty.value).to.be.equal('1000000000000000000000000000000000000000000000000000000000000001')

    })

    it('should change the harvester key', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        editorRepository.changeBootKey('1000000000000000000000000000000000000000000000000000000000000001')
        editorRepository.applyConfig()
        const bootKeyProperty = editorRepository.readSelectedParameter('account.bootPrivateKey', 'user')
        expect(bootKeyProperty.propertyName).to.be.equal('account.bootPrivateKey')
        expect(bootKeyProperty.value).to.be.equal('1000000000000000000000000000000000000000000000000000000000000001')
    })

    it('should change the friendly name', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        editorRepository.changeHarvestingKey('2220000000000000000000000000000000000000000000000000000000000001')
        editorRepository.applyConfig()
        const harvestingKeyProperty = editorRepository.readSelectedParameter('harvesting.harvesterPrivateKey', 'user')
        expect(harvestingKeyProperty.propertyName).to.be.equal('account.bootPrivateKey')
        expect(harvestingKeyProperty.value).to.be.equal('2220000000000000000000000000000000000000000000000000000000000001')
    })

    it('should add a new peer to the resources', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        editorRepository
            .addNewPeer('cool-node', '1000000000000000000000000000000000000000000000000000000000000001', 'newnodeip.com', NodeType.Peer)
        const peers = editorRepository.getPeers()
        expect(peers.length).to.be.equal(2)
        expect(peers[1].publicKey).to.be.equal('1000000000000000000000000000000000000000000000000000000000000001')
        expect(peers[1].name).to.be.equal('cool-node')

    })

    it('should apply an alternate configuration to resources', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        editorRepository.applyConfig(alternateConfigUrl)
        const bootKey = editorRepository.readSelectedParameter('account.bootPrivateKey', 'user')
        expect(bootKey.value).to.be.equal('bootKeyDifferent')
    })

    it('should change the topology of a node', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        editorRepository.changeTopology(NodeType.Dual)
        const nodeRoles = editorRepository.readSelectedParameter('localnode.roles', 'node')
        expect(nodeRoles.value).to.be.equal('Peer,Api')
    })
})
