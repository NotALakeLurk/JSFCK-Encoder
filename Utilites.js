const f_false = "![]";
const f_true = "!![]";

const f_NaN = "(+[![]])";
const f_undefined = "[][[]]"

const f_zero = "(+[])"
const f_one = "(+!+[])"


let map = {};

// digits
map[0] = `(${f_zero}+[])`;
map[1] = `(${f_one}+[])`;
map[2] = `(${f_one}+${f_one}+[])`;
map[3] = `(${f_one}+${f_one}+${f_one}+[])`;
map[4] = `(${f_one}+${f_one}+${f_one}+${f_one}+[])`;
map[5] = `(${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+[])`;
map[6] = `(${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+[])`;
map[7] = `(${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+[])`;
map[8] = `(${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+ [])`;
map[9] = `(${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+${f_one}+[])`;

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

const f_Infinity = `(+(${makeString(1)}+${makeString("e")}+${makeString(1000)}))`;

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
map["{"] = `([][${f_filter}]+[])[${number(18)}]`;
map["["] = `([][${f_filter}]+[])[${number(20)}]`;
map.v = `([][${f_filter}]+[])[${number(25)}]`;
map["]"] = `([][${f_filter}]+[])[${number(32)}]`;
map["}"] = `([][${f_filter}]+[])[${number(34)}]`;

const f_constructor = makeString("constructor");

// 1.1e+20
map["."] = `((+(${makeString(11)}+${makeString("e")}+${makeString(20)})+[])[${number(1)}])`;
map["+"] = `((+(${makeString(11)}+${makeString("e")}+${makeString(20)})+[])[${number(4)}])`;

// String
map.S = `((([]+[])[${makeString("constructor")}]+[])[${number(9)}])`;
map.g = `((([]+[])[${makeString("constructor")}]+[])[${number(14)}])`;

// <font color="undefined"></font>
map["<"] = `((([]+[])[${makeString("fontcolor")}]()+[])[${number(0)}])`;
map["="] = `((([]+[])[${makeString("fontcolor")}]()+[])[${number(11)}])`;
map["\""] = `((([]+[])[${makeString("fontcolor")}]()+[])[${number(12)}])`;
map[">"] = `((([]+[])[${makeString("fontcolor")}]()+[])[${number(23)}])`;
map["/"] = `((([]+[])[${makeString("fontcolor")}]()+[])[${number(26)}])`;

// map[";"] = `;`

function number(n) { // Might be best to just replace all occurances with `(+${makeString(n)})`
  return `(+(${makeString(n)}))`
}

function stringify(v) { return `(${v}+[])` }
// function numberify(n) { return `(+(${n}))` }

// function numString(n) {
//   n = n.toString().split('');

//   n.forEach((c, i) => {
//     n[i] = `(${map[c]})`;
//   });

//   return n.join("+");
// }

function makeString(str) {
  str = str.toString();
  let res = [];

  for (var c of str) {
    let mapped;

    try {
      if (!(c in map)) { throw (`: \`${c}\` does not exist in \`map\``); } // Eventually this should be blacklisted

      mapped = map[c];
      mapVal = eval(mapped);
      if (mapVal != c) { throw (`: \`${c}\` is incorrect in \`map\`; mapVal = \`${mapVal}\``); }

    } catch (error) { mapped = any_letter(c); }
    
    res.push(mapped);
  }

  return res.join("+");
}

function f_function(func) {
  func = makeString(func);

  str = `[][${f_filter}][${f_constructor}](${func})()`;

  return str;
}

const base36 = "0123456789abcdefghijklmnopqrstuvwxyz"; // `toString()` allows for converting to alternate bases, base 36 includes every letter
function any_letter(letter) {
  if (!base36.includes(letter)) { throw(`: \`${letter}\` not in base36`); }

  i = base36.indexOf(letter);

  res = `(${number(i)})[${makeString("toString")}](${number(36)})`;

  return res;
}

;