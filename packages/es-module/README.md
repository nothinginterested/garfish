# `@garfish/es-module`

[![NPM version](https://img.shields.io/npm/v/@garfish/es-module.svg?style=flat-square)](https://www.npmjs.com/package/@garfish/es-module)

Inspired by [virtual-es-module](https://github.com/imtaotao/virtual-es-module).

## Usage

```js
import Runtime from '@garfish/es-module';
const runtime = new Runtime();

// Start by url
const module = await runtime.dynamicImport('./a.mjs');
console.log(module);

// Start by code
const module = await runtime.importByCode(`
  import * as m from './a.mjs';
  export default 1;
`);
console.log(module);
```

## Use in Garfish

```js
import { GarfishEsModule } from '@garfish/es-module';

Garfish.run({
  ...
  plugins: [
    ...
    GarfishEsModule({
      excludes: ['appName'],
    }),
  ],
})
```