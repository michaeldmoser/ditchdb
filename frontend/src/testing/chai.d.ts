declare module Chai {
  interface Assertion {
    disabled(): Assertion;
    required(): Assertion;
  }
}
