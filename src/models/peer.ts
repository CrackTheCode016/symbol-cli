import { NodeType } from '../models/template'
import { instance } from 'ts-mockito'


const PEER_TO_ROLE_MAPPINGS = {
    0: 'Peer',
    1: 'Api',
    2: 'Peer,Api',
}

/**
 * Resources peer interface.
 */
export interface PeerDTO {
    publicKey: string;
    endpoint: {
        host: string;
        port: number;
    };
    metadata: {
        name: string;
        roles: string;
    };
}

/**
 * Resources peer interface.
 */
export interface PeerFileDTO {
    info: string;
    knownPeers: PeerDTO[];
}

/**
 * Resources peer model.
 */
export class Peer {

    constructor(
        readonly publicKey: string,
        readonly name: string,
        readonly ip: string,
        readonly role: NodeType | string) { }

    public toDTOForStorage(): PeerDTO {
        return {
            publicKey: this.publicKey,
            endpoint: {
                host: this.ip,
                port: 7900,
            },
            metadata: {
                name: this.name,
                roles: typeof this.role === 'string' ? this.role : PEER_TO_ROLE_MAPPINGS[this.role],
            },
        }
    }

    public static createFromDTO(peerDTO: PeerDTO): Peer {
        const role = this.getNodeRoleFromString(peerDTO.metadata.roles, PEER_TO_ROLE_MAPPINGS)
        return new Peer(peerDTO.publicKey, peerDTO.metadata.name, peerDTO.endpoint.host, role)
    }

    private static getNodeRoleFromString(value: string, object: any): NodeType {
        const role = Object.keys(object).find((key) => object[key] === value)
        if (role !== undefined) {
            return parseInt(role, 10) as NodeType
        }
        throw Error('Node role undefined')
    }
}
