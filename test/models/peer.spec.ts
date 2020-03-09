import { expect } from 'chai'
import { Peer } from '../../src/models/peer'

describe('Peer model', () => {

    const peerDTO = {
        publicKey: 'key',
        endpoint: {
            host: '127.0.0.1',
            port: 7900,
        },
        metadata: {
            name: 'some-name',
            roles: 'Peer',
        },
    }
    it('should create a peer entry from constructor', () => {
        const peer = new Peer('key', 'some-name', '127.0.0.1', 'Peer')
        expect(peer).to.not.be.equal(undefined)
        expect(peer.name).to.be.equal('some-name')
        expect(peer.publicKey).to.be.equal('key')
        expect(peer.ip).to.be.equal('127.0.0.1')
        expect(peer.role).to.be.equal('Peer')
    })

    it('should convert from a DTO to a model', () => {
        const peer = Peer.createFromDTO(peerDTO)
        expect(peer.name).to.be.equal('some-name')
        expect(peer.publicKey).to.be.equal('key')
        expect(peer.ip).to.be.equal('127.0.0.1')
        expect(peer.role).to.be.equal('Peer')
    })

    it('should convert to a DTO ready for storage', () => {
        const peer = new Peer('key', 'some-name', '127.0.0.1', 'Peer')
        const peerCreatedFromDTO = peer.toDTOForStorage()
        expect(peerCreatedFromDTO.metadata.name).to.be.equal('some-name')
        expect(peerCreatedFromDTO.publicKey).to.be.equal('key')
        expect(peerCreatedFromDTO.endpoint.host).to.be.equal('127.0.0.1')
        expect(peerCreatedFromDTO.metadata.roles).to.be.equal('Peer')
    })
})
