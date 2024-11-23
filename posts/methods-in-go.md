---
title: Go does not have classes 
published_at: 2024-05-23T18:00:00.000Z
snippet: Go does not have classes. However, you can define methods on types.
private: false
for_friends_only: false
draft: false
type: micro
---

Go does not have classes. However, you can define methods on types.

A method is a function with a special receiver argument.

The receiver appears in its own argument list between the `func` keyword and the method name.

In this example, the `Abs` method has a receiver of type `Vertex` named `v`.

```go
package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
```

:scream:

Because defining a function inside a struct was too obvious.
