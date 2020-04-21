import { expect } from 'chai'
import * as fs from 'fs-extra'
import { ResourcesEditor } from '../../src/respositories/resources.editor.repository'
import { NodeType } from '../../src/models/template'

describe('Resource Editor', () => {

    const templateUrl = './test/mocks/sample-template'
    const alternateConfigUrl = './test/mocks/sample-template/other-config-file.json'

    const loadConfigFile = () => fs.readJsonSync(templateUrl + '/symbol-config.json')

    const copyResources = () => fs.copySync('./test/mocks/resources', './test/mocks/sample-template/resources')
    const deleteResources = () => fs.removeSync('./test/mocks/sample-template/resources')

    before(() => {
        copyResources()
    })

    after(() => {
        deleteResources()
    })

    it('should create a new repository', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        expect(editorRepository).to.not.be.equal(undefined)
    })

    it('should change the maxfee', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        editorRepository.changeMaxFee(100)
        const maxFeeProperty = loadConfigFile().config.maxFee
        expect(maxFeeProperty).to.be.equal(100)

    })

    it('should change the boot private key', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        editorRepository.changeBootKey('1000000000000000000000000000000000000000000000000000000000000001')
        const bootKeyProperty = loadConfigFile().config.bootPrivateKey
        expect(bootKeyProperty).to.be.equal('1000000000000000000000000000000000000000000000000000000000000001')

    })

    it('should change the harvester key', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        editorRepository.changeHarvestingKey('1000000000000000000000000000000000000000000000000000000000000001')
        const harvesterKey = loadConfigFile().config.harvesterKey
        console.log(loadConfigFile())
        expect(harvesterKey).to.be.equal('1000000000000000000000000000000000000000000000000000000000000001')
    })

    it('should change the friendly name', () => {
        const editorRepository = new ResourcesEditor(templateUrl)
        editorRepository.changeFriendlyName('cool-name')
        const friendlyName = loadConfigFile().config.friendlyName
        expect(friendlyName).to.be.equal('cool-name')
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
        const role = loadConfigFile().config.role
        expect(role).to.be.equal(NodeType.Dual)
    })
})
