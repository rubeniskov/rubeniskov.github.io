/* eslint-disable prettier/prettier */
// Create your own language definition here
// You can safely look at other samples without losing modifications.
// Modifications are not saved on browser refresh/close though -- copy often!
const lang = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  // defaultToken: 'invalid',

  keywords: [
    'break', 'case', 'continue', 'default', 'do', 'else', 'for', 'goto', 'if',
    '_Pragma', 'return', 'switch', 'while'
  ],

  typeKeywords: [
    'struct', 'void', 'bool', 'int', 'uint', 'float', 'double',
    'vec2', 'vec3', 'vec4', 'dvec2', 'dvec3', 'dvec4',
    'bvec2', 'bvec3', 'bvec4', 'ivec2', 'ivec3', 'ivec4',
    'uvec2', 'uvec3', 'uvec4', 'mat2', 'mat3', 'mat4',
    'mat2x2', 'mat2x3', 'mat2x4', 'mat3x2', 'mat3x3', 'mat3x4',
    'mat4x2', 'mat4x3', 'mat4x4', 'dmat2', 'dmat3', 'dmat4',
    'dmat2x2', 'dmat2x3', 'dmat2x4', 'dmat3x2', 'dmat3x3',
    'dmat3x4', 'dmat4x2', 'dmat4x3', 'dmat4x4',
    'sampler1D', 'sampler2D', 'sampler3D',
    'image1D', 'image2D', 'image3D', 'samplerCube', 'imageCube', 'sampler2DRect',
    'image2DRect', 'sampler1DArray', 'sampler2DArray', 'image1DArray', 'image2DArray',
    'samplerBuffer', 'imageBuffer', 'sampler2DMS', 'image2DMS', 'sampler2DMSArray',
    'image2DMSArray', 'samplerCubeArray', 'imageCubeArray', 'sampler1DShadow', 'sampler2DShadow',
    'sampler2DRectShadow', 'sampler1DArrayShadow', 'sampler2DArrayShadow', 'samplerCubeShadow',
    'samplerCubeArrayShadow', 'isampler1D', 'isampler2D', 'isampler3D', 'iimage1D', 'iimage2D', 'iimage3D',
    'isamplerCube', 'iimageCube', 'isampler2DRect', 'iimage2DRect',
    'isampler1DArray', 'isampler2DArray', 'iimage1DArray', 'iimage2DArray',
    'isamplerBuffer', 'iimageBuffer', 'isampler2DMS', 'iimage2DMS', 'isampler2DMSArray', 'iimage2DMSArray', 'isamplerCubeArray', 'iimageCubeArray', 'atomic_uint',
    'usampler1D', 'usampler2D', 'usampler3D', 'uimage1D', 'uimage2D', 'uimage3D',
    'usamplerCube', 'uimageCube', 'usampler2DRect', 'uimage2DRect', 'usampler1DArray', 'usampler2DArray',
    'uimage1DArray', 'uimage2DArray', 'usamplerBuffer', 'uimageBuffer', 'usampler2DMS', 'uimage2DMS', 'usampler2DMSArray', 'uimage2DMSArray', 'usamplerCubeArray', 'uimageCubeArray'
  ],

  operators: [
    '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
    '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
    '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
    '%=', '<<=', '>>=', '>>>='
  ],

  // we include these common regular expressions
  symbols:  /[=><!~?:&|+\-*\/\^%]+/,

  // C# style strings
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'keyword',
                                   '@keywords': 'keyword',
                                   '@default': 'identifier' } }],
      [/[A-Z][\w\$]*/, 'type.identifier' ],  // to show class names nicely

      // whitespace
      { include: '@whitespace' },

      // delimiters and operators
      [/[{}()\[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [/@symbols/, { cases: { '@operators': 'operator',
                              '@default'  : '' } } ],

      // glslify pragma.
      [/#\s*[a-zA-Z_\$][\w\$]*\s(glslify:)\s*([\w]+)\s*=\s*require\(([\w-/]+)\)/, {
        token: 'annotation',
        log: '$1 module $3 as $2'
      }],

      // numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/0[xX][0-9a-fA-F]+/, 'number.hex'],
      [/\d+/, 'number'],

      // delimiter: after number because of .\d floats
      [/[;,.]/, 'delimiter'],

      // strings
      [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
      [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],

      // characters
      [/'[^\\']'/, 'string'],
      [/(')(@escapes)(')/, ['string','string.escape','string']],
      [/'/, 'string.invalid']
    ],

    comment: [
      [/[^\/*]+/, 'comment' ],
      [/\/\*/,    'comment', '@push' ],    // nested comment
      ["\\*/",    'comment', '@pop'  ],
      [/[\/*]/,   'comment' ]
    ],

    string: [
      [/[^\\"]+/,  'string'],
      [/@escapes/, 'string.escape'],
      [/\\./,      'string.escape.invalid'],
      [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\/\*/,       'comment', '@comment' ],
      [/\/\/.*$/,    'comment'],
    ],
  },
};

export default lang;
