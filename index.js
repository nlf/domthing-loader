var Domthing = require('domthing');

module.exports = function (source) {
    this.cacheable();

    var callback = this.async();

    Domthing.parser(source, function (err, ast) {
        if (err) {
            return callback(err);
        }

        var compiled = Domthing.compiler.compile(ast);
        var body = [
            'var _runtime = require(' + JSON.stringify(require.resolve('domthing/runtime')) + ');',
            'module.exports = function (template, runtime) {',
            '    return ' + compiled + '(template, runtime || _runtime);',
            '}'
        ].join('\n');

        callback(null, body);
    });
};
