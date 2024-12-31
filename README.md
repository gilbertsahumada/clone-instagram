## Clon Instagram Web3 | Configuración MONOREPO

**Curso de youtube - Giberts Ahumada**

**Parte 1 - Diseño de la solución -** [Youtube 1 ](https://youtu.be/w23abGly56I)

**Parte 2 - Configuración del mono repo -** [Youtube 2 ](https://www.youtube.com/watch?v=Sd9I7gS_P7k)

**Parte 3 - Arquitectura de una Aplicación Descentralizada -** [Youtube 3 ](https://youtu.be/T9LN89OraLY)

**Parte 4 - Desarrollo Smart Contracts -** [Youtube 4 ](https://youtu.be/exeWVCim-7U)

**Parte 5 - Integrar Foundry en Hardhat -** [Youtube 5 ](https://youtu.be/rVj9nRp36GI)

**Parte 6 - NatSpec, cómo comentar los Contratos -** [Youtube 6 ](https://youtu.be/O_EUT7TIP44)

**Parte 7 - Tests con Foundry -** [Youtube 7 ](https://youtu.be/IHuIcapTmik)

**Parte 8 - Despliegue de Contratos y Configuración adicional -** [Youtube 8 ](https://youtu.be/Fl8DRu9IgGw)

**Parte 9 - Creando Rutas -** [Youtube 9 ](https://youtu.be/EBd7JYbS35g)

**Parte 10 - Diseño - TailwindCSS - shadcn - v0 -** [Youtube 10 ](https://youtu.be/DnuGtF4xziw)

**Parte 11 - Pinata SDK - Subiendo Metadata -** [Youtube 11 ](https://youtu.be/hhkES1fx_7A)

**Parte 12 - Integrando Wallet Wallet - RainbowKit / Viem  -** [Youtube 12 ](https://youtu.be/AZ6QMOIgsTU)

**Parte 12 - Integrando The Graph -** [Youtube 13 ](https://youtu.be/BmA_gskJULU)


[![Captura de pantalla del proyecto](https://github.com/user-attachments/assets/4534758f-3458-4f01-92b8-2bebe4976e63)](https://github.com/user-attachments/assets/4534758f-3458-4f01-92b8-2bebe4976e63)


**Notion Page -** [Notion:](https://feline-tractor-5af.notion.site/Clon-Instagram-Web3-4ef6b1bd5dff4a719a762b93bb8ceb73)

[![Captura de pantalla de la configuración del proyecto](https://github.com/user-attachments/assets/125ba2ad-2650-4d07-b7c8-6527122aefdd)](https://github.com/user-attachments/assets/125ba2ad-2650-4d07-b7c8-6527122aefdd)

## Descripción del proyecto

Este proyecto tiene como objetivo crear un clon de Instagram basado en Web3, aprovechando el poder de Chainlink y otras tecnologías descentralizadas. La configuración de monorepo nos permite administrar eficientemente los distintos componentes del proyecto.

## Tecnologías clave

* Solidity
* React
* Hardhat
* Foundry
* TypeScript

## Configuración Monorepo

```
├── project
│ ├── react
│ │ ├── src
│ │ │ └── ...
│ │ └── ...
│ └── hardhat
│ ├── ...
│ └── ...
└── ...

```

## Ejemplos de código

**Ejemplo 1: Interacción con Chainlink**

```javascript
import { useState, useEffect } from "react";
import Web3 from "web3";

const useChainlink = () => {
const [data, setData] = useState(null);

useEffect(() => {
const web3 = new Web3(window.ethereum);
// ... Llamada a la función Chainlink
web3.eth.call({ to: chainlinkContractAddress, data: chainlinkFunctionData })
.then((result) => {
setData(result);
})
.catch((error) => {
console.error(error);
});
}, []);

return data;
};

// ... Uso del gancho en un componente de React
const MyComponent = () => {
const chainlinkData = useChainlink();
// ...
};

```

## Configuración del Proyecto

### Configuración para el despliegue

Instalar `dotenv`

```shell
npm i dotenv
```

Agregar en el archivo `hardhat/hardhat.config.ts` lo siguiente

```typescript
import dotenv from "dotenv";
dotenv.config();
```

Crear un archivo lllamado `.env` en la ruta `hardhat/.env`. Agrega la siguiente variable de entorno

```env
AVAX_PRIVATE_KEY=<TU_LLAVE_PRIVADA>
```

Luego en el archivo `hardhat.config.ts` agrega el siguiente código para acceder al valor del archivo `.env` y utilizarlo en nuestro archivo de configuración

```typescript
const AVAX_PRIVATE_KEY = `${process.env.AVAX_PRIVATE_KEY}` || "";
```

Luego expandimos el archivo de configuración para agregar `Avalanche Fuji`

```typescript
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    avaxFuji: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      accounts: [`0x${AVAX_PRIVATE_KEY}`],
    },
  },
};
```

### Configuración de rutas front-end

Para cualquier instalación y/o configuración que hagamos en el front-end recuerda que debes posicionarte en la carpeta `react`.

Instalación dependencias

```shell
npm install react-router-dom
```

Ver Video 9 para completar 

### Instalación Tailwind CSS

## Involucrarse

* Si quieres seguir todos los videos visita [la lista de reproducción](https://www.youtube.com/playlist?list=PL2uIxLJ7G8e2Y825VjgxsB8jXxTW5Tp9w).
* Suscríbete al canal de YouTube para obtener más actualizaciones.
* Deja tus comentarios y opiniones a continuación.
* ¡Colabora con el proyecto en GitHub!
