<meta name="nano" content="nano_3ntf6crkan6114rfb39d51udqdw4mrbt1x7n8uphx44ojhxcjo3exhk6dsme"/>
# enum-mixin

Enum mixin for declaring "Java-like" enums.

## Usage

Class statement:
```js
class Fruit extends Enum() {
    apple;
    banana;
    orange;
    strawberry;
}
```

Class expression:
```js
const Fruit = class extends Enum() {
    apple;
    orange;
    strawberry;
    banana = "berry";
}
```

Comparisons:
```js
Fruit.apple == Fruit.orange; // false
```

Type check:
```js
Fruit.banana instanceof Fruit; // true
```

Access by key name:
```js
const key = "strawberry";
Fruit[key]; // Fruit.strawberry
```

Access by value:
```js
Fruit.byValue("orange"); // Fruit.orange
Fruit.byValue("berry"); // Fruit.banana
```

String representation:
```js
Fruit.banana.toString(); // [enum Fruit(banana)]
```

JSON representation:
```js
JSON.stringify({fruit: Fruit.banana}); // {"fruit": "berry"}
```

## Notes
Enum members are lazy loaded to the static context of the class on first access.

```js
class Lazy extends Enum() {
    one;
    two;
    three;
}

// Before loading
Object.keys(Lazy); // []

// Trying to access any property will trigger the mixin
Lazy._;

// After loading
Object.keys(Lazy); // ["one", "two", "three"]
```

To explicitly load the static context you may use the static method `initialize`.

```js
class Forced extends Enum() {
    one;
    two;
    three;
}
Forced.initialize();

Object.keys(Lazy); // ["one", "two", "three"]
```

## Thanks

Pay me a coffee:

```
nano_3ntf6crkan6114rfb39d51udqdw4mrbt1x7n8uphx44ojhxcjo3exhk6dsme
```

[![nano_3ntf6crkan6114rfb39d51udqdw4mrbt1x7n8uphx44ojhxcjo3exhk6dsme](./donation.png)](nano:nano_3ntf6crkan6114rfb39d51udqdw4mrbt1x7n8uphx44ojhxcjo3exhk6dsme)
