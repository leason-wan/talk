const compiler = require('vue-template-compiler')

const template = '<div>{{msg}}</div>'


console.log(compiler.compile(template));
`
{ ast:
  { type: 1,
    tag: 'div',
    attrsList: [],
    attrsMap: {},
    rawAttrsMap: {},
    parent: undefined,
    children: [ [Object] ],
    plain: true,
    static: false,
    staticRoot: false },
 render: 'with(this){return _c(\'div\',[_v(_s(msg))])}',
 staticRenderFns: [],
 errors: [],
 tips: [] 
}
`