const f_false = "![]";
const f_true = "!![]";

const f_NaN = "(+[![]])";
const f_undefined = "[][[]]"


let map = {};

// digits
map[0] = `(${number(0)})`;
map[1] = `(${number(1)})`;
map[2] = `(${number(2)})`;
map[3] = `(${number(3)})`;
map[4] = `(${number(4)})`;
map[5] = `(${number(5)})`;
map[6] = `(${number(6)})`;
map[7] = `(${number(7)})`;
map[8] = `(${number(8)})`;
map[9] = `(${number(9)})`;

// false
map.f = `(${stringify(f_false)}[${number(0)}])`;
map.a = `(${stringify(f_false)}[${number(1)}])`;
map.l = `(${stringify(f_false)}[${number(2)}])`;
map.s = `(${stringify(f_false)}[${number(3)}])`;

// true
map.t = `(${stringify(f_true)}[${number(0)}])`;
map.r = `(${stringify(f_true)}[${number(1)}])`;
map.u = `(${stringify(f_true)}[${number(2)}])`;
map.e = `(${stringify(f_true)}[${number(3)}])`;

// NaN
map.N = `(${stringify(f_NaN)}[${number(0)}])`;

// undefined
map.u = `(${stringify(f_undefined)}[${number(0)}])`;
map.n = `(${stringify(f_undefined)}[${number(1)}])`;
map.d = `(${stringify(f_undefined)}[${number(2)}])`;
map.i = `(${stringify(f_undefined)}[${number(5)}])`;

const f_Infinity = `(+(${number(1)}+${map.e}+${numString(1000)}))`;

// Infinity
map.I = `(${stringify(f_Infinity)}[${number(0)}])`;
map.y = `(${stringify(f_Infinity)}[${number(7)}])`;

const f_filter = makeString("filter");

// function filter() { [native code] }
map.u = `([][${f_filter}]+[])[${number(1)}]`;
map.c = `([][${f_filter}]+[])[${number(3)}]`;
map.o = `([][${f_filter}]+[])[${number(6)}]`;
map[" "] = `([][${f_filter}]+[])[${number(8)}]`;
map["("] = `([][${f_filter}]+[])[${number(15)}]`;
map[")"] = `([][${f_filter}]+[])[${number(16)}]`;
map["{"] = `([][${f_filter}]+[])[${number(16)}]`;
map["["] = `([][${f_filter}]+[])[${number(18)}]`;
map.v = `([][${f_filter}]+[])[${number(23)}]`;
map["]"] = `([][${f_filter}]+[])[${number(30)}]`;
map["}"] = `([][${f_filter}]+[])[${number(32)}]`;

const f_constructor = makeString("constructor");

// 1.1e+20
map["."] = `((+(${numString(11)}+${map.e}+${numString(20)})+[])[${number(1)}])`;
map["+"] = `((+(${numString(11)}+${map.e}+${numString(20)})+[])[${number(4)}])`;

// String
map.S = `((([]+[])[${makeString("constructor")}]+[])[${number(9)}])`;
map.g = `((([]+[])[${makeString("constructor")}]+[])[${number(14)}])`;

// <font color="undefined"></font>
map["<"] = `((([]+[])[${makeString("fontcolor")}]()+[])[${number(0)}])`;
map["="] = `((([]+[])[${makeString("fontcolor")}]()+[])[${number(11)}])`;
map["\""] = `((([]+[])[${makeString("fontcolor")}]()+[])[${number(12)}])`;
map[">"] = `((([]+[])[${makeString("fontcolor")}]()+[])[${number(23)}])`;
map["/"] = `((([]+[])[${makeString("fontcolor")}]()+[])[${number(26)}])`;

function number(n) {
  let res = `+[]`;
  for (let i = 0; i < n; i++) {
    res += "+" + `(+!+[])`;
  }
  return res;
}

function stringify(v) { return `(${v}+[])` }
// function numberify(n) { return `(+(${n}))` }

function numString(n) {
  n = n.toString().split(([]+[]));

  n.forEach((c, i) => {
    n[i] = `[${number(+c)}]`;
  });

  return n.join("+");
}

function makeString(s) {
  s = s.toString().split(([]+[]));
  s2 = [];

  for (var c of s) {
    if (c in map) { s2.push(map[c]); } else { throw(`: \`${c}\` does not exist in \`map\``); }
  }

  return s2.join("+");
}

function f_function(func) {
  func = makeString(func.toString());

  str = `[][${f_filter}][${f_constructor}](${func})()`; // TODO - func is the problem 

  return str;
}

// data = makeString('console.log("a")');
data = f_function('console.log("lol git gud 1337 too cool 4 u")');

const fs = require('fs')
fs.writeFileSync("output.js", data)

console.log(data);
eval(data);

// "
// ([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]]

;

/*
  CURRENT PROBLEM: some dumb string issue
*/ 

