/**
 * @typedef {Object} EnumMember
 * @property {function} toJSON
 * @property {function} toString
 * @property {string} key
 * @property {any} value
 */

module.exports = () => {
    let frozen = false;
    let keys = null;

    /** @class */
    const Mixin = class {
        #enumInit(key, value) {
            Object.keys(this).forEach(placeholder => {
                delete this[placeholder];
            });

            this.key = key;
            this.value = value;
        }

        constructor() {
            if (frozen)
                throw new Error("Cannot create enum value after static initialization");
        }

        toJSON() {
            return this.value;
        }

        toString() {
            const name = this.constructor.name;
            return `[enum ${name}(${this.key})]`;
        }

        static byValue(value) {
            return this[keys.find(key => {
                return this[key] && this[key].value === value;
            })];
        }

        static toObject() {
            return keys.reduce((obj, key) => {
                obj[key] = this[key].value;
                return obj;
            }, {});
        }

        static toJSON() {
            return this.toObject();
        }

        static initialize() {
            if (frozen)
                return;

            const base = new this();
            keys = Object.keys(base);

            keys.forEach(k => {
                this[k] = new this();
                this[k].#enumInit(k, base[k] ?? k);
                Object.freeze(this[k]);
            });

            Object.freeze(this);
            frozen = true;
        }
    };
    return new Proxy(Mixin, {
        get(target, name, cls) {
            if (!frozen && name !== "prototype") {
                target.initialize.call(cls);
            }
            return target[name];
        }
    });
};
