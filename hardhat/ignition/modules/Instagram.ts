import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const InstagramModule = buildModule("InstagramModule", (m) => {
    const instagram = m.contract("Instagram", [], { });

    return { instagram };
})

export default InstagramModule;