const defaultCodeTemplates: Record<string, string> = {
  python: `print("Hello, World!")`,

  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

  javascript: `console.log("Hello, World!");`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,

  rust: `fn main() {
    println!("Hello, World!");
}`, 

  php: `<?php
echo "Hello, World!";
?>`,

  go: `package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}`,

  csharp: `using System;

class Program {
    static void Main(string[] args) {
        Console.WriteLine("Hello, World!");
    }
}`,

    kotlin: `fun main() {
    println("Hello, World!")
}    
`,

  ruby: `puts "Hello, World!"`,

  
  
  // You can add more languages here
};

export default defaultCodeTemplates;
