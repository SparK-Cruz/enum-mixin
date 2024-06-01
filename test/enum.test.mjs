import { describe, it } from "node:test";
// import assertLoose from "node:assert";
import assert from "node:assert/strict";
import Enum from "../index.mjs";

describe("Enum mixin", () => {
    class Subject extends Enum() {
        foo;
        bar;
        baz = "lorem";
    }

    it("Should have 3 static public properties of the same type", async () => {
        const expected = ["alice", "bob", "charlie"];

        const LocalSubject = class extends Enum() {
            alice;
            bob;
            charlie;
        }

        // force lazy init to run
        LocalSubject._;

        assert.equal(Object.keys(LocalSubject).toString(), expected.toString());
        Object.keys(LocalSubject).forEach(prop => {
            assert(LocalSubject[prop] instanceof LocalSubject);
        });
    });

    it("Should have its members retrievable by value", async () => {
        assert.equal(Subject.byValue("foo"), Subject.foo);
        assert.equal(Subject.byValue("bar"), Subject.bar);
        assert.equal(Subject.byValue("lorem"), Subject.baz);

        assert.equal(typeof Subject.byValue("baz"), 'undefined');
    });

    it("Should be array-accessible by key", async () => {
        assert.equal(Subject["foo"], Subject.foo);
        assert.equal(Subject["bar"], Subject.bar);
        assert.equal(Subject["baz"], Subject.baz);
    });

    it("Should not have keys available on instances", async () => {
        assert.equal(typeof Subject.foo.bar, 'undefined');
    });

    it("Should not be modifiable after declaration", async () => {
        const NewSubject = class extends Enum() {
            foo;
            bar;
        };

        NewSubject.baz = null;
        assert(!NewSubject.baz);
    });

    it("Should be represented by a custom type string on console", async () => {
        assert.equal(Subject.foo.toString(), "[enum Subject(foo)]");
    });
});
