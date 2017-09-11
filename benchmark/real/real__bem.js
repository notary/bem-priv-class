var data = require('../data/elements.json');
var BEMPRIV = require('bem-priv');

BEMPRIV.decl('page', {
    json: function() {
        return {
            block: 'page',
            content: [
                BEMPRIV.json('header', {
                    showBadge: true
                }),
                BEMPRIV.json('content'),
                BEMPRIV.json('footer')
            ]
        }
    }
});


BEMPRIV.decl('header', {
    getDefaultParams: function() {
        return {
            showBadge: false
        };
    },
    json: function() {
        return {
            block: 'header',
            js: this.getJS(),
            content: this.getContent()
        }
    },
    getJS: function() {
        return false;
    },
    getContent: function() {
        return [
            this.getLogo(),
            this.getUser(),
            this.getBadge()
        ]
    },
    getUser: function() {
        return {
            elem: 'user',
            content: BEMPRIV.json('user')
        }
    },
    getLogo: function() {
        return {
            elem: 'logo',
            content: 'logo'
        }
    },
    getBadge: function() {
        return {
            elem: 'badge',
            content: 'badge'
        };
    }
});

BEMPRIV.decl('user', {
    json: function() {
        return {
            block: 'user',
            content: 'user'
        }
    }
});

BEMPRIV.decl('header', {
    getJS: function() {
        return {
            hello: 'world'
        }
    },
    getLogo: function() {
        return {
            elem: 'logo',
            content: {
                tag: 'strong',
                content: 'service logo'
            }
        };
    }
});

BEMPRIV.decl('footer', {
    json: function() {
        return {
            block: 'footer',
            content: this.getContent()
        }
    },
    getContent: function() {
        return 'footer';
    }
});

BEMPRIV.decl('footer', {
    getContent: function() {
        return {
            elem: 'copyright',
            content: 'copy'
        };
    }
});

BEMPRIV.decl('content', {
    json: function() {
        return {
            block: 'content',
            content: BEMPRIV.json('items')
        };
    }
});

BEMPRIV.decl('items', {
    getDefaultParams: function() {
        return {
            showAtomicNumber: true,
            showAtomicWeight: true,
            showAtomicRadius: false,
            showAtomicVolume: false
        }
    },
    json: function() {

        var self = this,
            params = this.params;

        return {
            block: 'items',
            content: Object.keys(data).map(function(key) {
                return {
                    elem: 'item',
                    content: [
                        {
                            elem: 'symbol',
                            content: self.getSymbol(data[key])
                        },
                        params.showAtomicNumber ? self.getAtomicNumber(data[key]) : '',
                        params.showAtomicWeight ? self.getAtomicWeight(data[key]) : '',
                        params.showAtomicRadius ? self.getAtomicRadius(data[key]) : '',
                        params.showAtomicVolume ? self.getAtomicVolume(data[key]) : ''
                    ]
                };
            })
        };
    },
    getSymbol: function(elem) {
        return elem.symbol;
    },
    getAtomicNumber: function(elem) {
        return elem.atomic_number
    },
    getAtomicWeight: function(elem) {
        return elem.atomic_weight;
    },
    getAtomicRadius: function(elem) {
        return elem['atomic_radius pm'];
    },
    getAtomicVolume: function(elem) {
        return elem['atomic_volume cm3/mol'];
    }
});

module.exports = BEMPRIV;
