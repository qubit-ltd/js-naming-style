////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * ESLint flat configuration for js-naming-style project.
 *
 * @author Haixing Hu
 */

import qubitConfig from '@qubit-ltd/eslint-config';

export default [
  ...qubitConfig,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
];