import { PinataSDK } from "pinata-web3"

const PINATA_JTW = import.meta.env.VITE_PINATA_API_KEY || ''
const GATEWAY_IPFS = import.meta.env.VITE_GATEWAY_IPFS || ''

if (!PINATA_JTW || !GATEWAY_IPFS) {
    throw new Error("PINATA_JWT or GATEWAY_IPFS not set")
}

const pinata = new PinataSDK({
    pinataJwt: PINATA_JTW
})

export async function uploadFile(file: File) {
    try {
        const upload = await pinata.upload.file(file)
        console.log(upload)
        return upload.IpfsHash
    } catch (error) {
        console.log(error);
    }
}

export async function uploadMetadataToPinata(
    name: string,
    description: string,
    imageUrl: string,
    attributes?: Record<string, any>[]
) {
    try {
        const finalImgUrl = `${GATEWAY_IPFS}${imageUrl}`
        const upload = await pinata.upload.json({
            name: name,
            description: description,
            image: finalImgUrl,
            attributes: attributes
        })

        console.log(upload.IpfsHash)

        return `${GATEWAY_IPFS}${upload.IpfsHash}`
    } catch (error) {
        console.log(error);
    }
}

export async function getMetadata(){
    const data = await fetch(`${GATEWAY_IPFS}bafkreic6hbkkt3uzbdq4kn2c3xlemfq6e6dscjd2z635oo46nxqjcjgtyq`)
    //console.log(data);
    
    //await pinata.gateways.get("bafkreic6hbkkt3uzbdq4kn2c3xlemfq6e6dscjd2z635oo46nxqjcjgtyq")
    return data
}

/*
{
    "IpfsHash": "bafybeihsukvqfss4wqew4bhxlkcv4benksd7alzxsedkmkxbl7fxvutc5a",
    "PinSize": 616458,
    "Timestamp": "2024-09-22T18:49:37.035Z"
}
*/