
    - 1️⃣ What is the difference between var, let, and const?
        Answer:: var: Function-scoped, can be redeclared and updated. It has hoisting behavior (declared at the top of its scope).
                let: Block-scoped, can be updated but not redeclared in the same scope. Safer than var.
                const: Block-scoped, cannot be reassigned. Must be initialized at declaration.

    - 2️⃣ What is the spread operator (...)?
        Answer:: The spread operator expands arrays or objects into individual elements.
        const arr = [1, 2, 3];
        const newArr = [...arr, 4, 5];

    - 3️⃣ What is the difference between map(), filter(), and forEach()?
        map(): Transforms each element and returns a new array.
        filter(): Returns a new array with elements that pass a condition.
        forEach(): Executes a function for each element but returns nothing.

    - 4️⃣ What is an arrow function?
        Answer:: A shorter syntax for writing functions using =>.
          const add = (a, b) => a + b;

    - 5️⃣ What are template literals?
        Answer:: Strings written with backticks (`). They allow embedding variables and multi-line strings.
        const name = "Alice";
        console.log(`Hello, ${name}!`);